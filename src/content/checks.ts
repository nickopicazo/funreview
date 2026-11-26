import { hasActivity } from "./activities.ts"
import { BIN_ID, DESK_ID, FINGER_IDS, KEY_IDS, targetKeyIds } from "./computerLayout.ts"
import { columnSteps, hasColumnCarry } from "./multiply.ts"
import {
  ACTIVITY_IDS,
  isNumberItem,
  type ActivityId,
  type Choice,
  type PromptItem,
  type QuizItem,
  type WeekContent,
} from "./types.ts"
import { choiceSeed, correctPosition } from "../lib/shuffle.ts"

const PROBABILITY = ["certain", "likely", "unlikely", "impossible"] as const

function assertChoices(choices: Choice[], correctId: string, label: string) {
  if (choices.length < 2 || choices.length > 4) {
    throw new Error(`A question needs 2 to 4 choices: ${label}`)
  }
  if (!choices.some((choice) => choice.id === correctId)) {
    throw new Error(`The correct choice is missing: ${label}`)
  }
}

function assertPrompt(item: PromptItem) {
  assertChoices(item.choices, item.correctId, item.prompt)
}

type DeskItem = NonNullable<WeekContent["fileDesk"]>[number]

function byDeskId(files: DeskItem["files"], id: string) {
  return files.find((file) => file.id === id)
}

function isDeskFolder(files: DeskItem["files"], id: string) {
  if (id === DESK_ID) return true
  return byDeskId(files, id)?.kind === "folder"
}

function insideFolder(files: DeskItem["files"], nodeId: string, ancestorId: string) {
  const seen = new Set<string>()
  let current = byDeskId(files, nodeId)
  while (current) {
    if (seen.has(current.id)) return false
    seen.add(current.id)
    if (current.parentId === ancestorId) return true
    if (current.parentId === DESK_ID) return false
    current = byDeskId(files, current.parentId)
  }
  return false
}

function assertFileDesk(item: DeskItem, label: string) {
  const ids = new Set<string>()
  for (const file of item.files) {
    if (ids.has(file.id) || file.id === DESK_ID) {
      throw new Error(`${label} file id is repeated: ${file.id}`)
    }
    ids.add(file.id)
    if (file.parentId === file.id || !isDeskFolder(item.files, file.parentId)) {
      throw new Error(`${label} folder is missing for ${file.name}`)
    }
  }
  for (const file of item.files) {
    if (file.parentId !== DESK_ID && insideFolder(item.files, file.parentId, file.id)) {
      throw new Error(`${label} folders loop: ${file.name}`)
    }
  }
  const { goal } = item
  if (goal.action === "move" || goal.action === "copy") {
    const file = goal.fileId ? byDeskId(item.files, goal.fileId) : undefined
    if (!file || !goal.destId || !isDeskFolder(item.files, goal.destId)) {
      throw new Error(`${label} ${goal.action} goal is not reachable`)
    }
    if (goal.destId === file.id || goal.destId === file.parentId || insideFolder(item.files, goal.destId, file.id)) {
      throw new Error(`${label} ${goal.action} destination does not work`)
    }
    return
  }
  if (goal.action === "rename" || goal.action === "createFolder") {
    if (!goal.newName || !item.nameChoices?.includes(goal.newName)) {
      throw new Error(`${label} name chip is missing`)
    }
    if (goal.action === "rename") {
      const file = goal.fileId ? byDeskId(item.files, goal.fileId) : undefined
      if (!file || file.name === goal.newName) throw new Error(`${label} rename goal is not reachable`)
      return
    }
    if (!goal.destId || !isDeskFolder(item.files, goal.destId)) {
      throw new Error(`${label} new-folder goal is not reachable`)
    }
    return
  }
  if (goal.action === "delete") {
    const file = goal.fileId ? byDeskId(item.files, goal.fileId) : undefined
    if (!file || file.kind !== "file" || !isDeskFolder(item.files, BIN_ID)) {
      throw new Error(`${label} delete goal is not reachable`)
    }
    return
  }
  const bin = byDeskId(item.files, BIN_ID)
  if (!bin || bin.kind !== "folder" || !item.files.some((file) => file.parentId === BIN_ID)) {
    throw new Error(`${label} empty-bin goal is not reachable`)
  }
}

function assertQuizItem(item: QuizItem) {
  if (isNumberItem(item)) {
    if (!Number.isInteger(item.answer)) throw new Error(`Number answer must be a whole number: ${item.prompt}`)
    return
  }
  assertPrompt(item)
}

export function checkSubjectWeeks(weeks: WeekContent[], keyPrefix: string) {
  const balanceProblems: string[] = []
  const seen = new Set<string>()
  for (const week of weeks) {
    if (seen.has(week.id)) throw new Error(`${keyPrefix} repeats ${week.id}`)
    seen.add(week.id)
    if (!week.quiz || week.quiz.length !== 10) {
      throw new Error(`${keyPrefix}/${week.id} needs 10 quiz questions.`)
    }
    for (const item of week.quiz) assertQuizItem(item)
    for (const item of week.riddles ?? []) assertPrompt(item)

    const prompted = [
      ...(week.riddles ?? []).map((item, index) => ({ item, activity: "riddles", index })),
      ...week.quiz.flatMap((item, index) => (isNumberItem(item) ? [] : [{ item, activity: "quiz", index }])),
    ]
    if (prompted.length > 0) {
      const counts = new Map<number, number>()
      for (const { item, activity, index } of prompted) {
        const position = correctPosition(
          item.choices,
          item.correctId,
          choiceSeed(`${keyPrefix}/${week.id}`, activity, index),
        )
        counts.set(position, (counts.get(position) ?? 0) + 1)
      }
      const top = Math.max(...counts.values())
      // Fewer than four choice questions cannot show a repeated slot.
      if (prompted.length >= 4 && top / prompted.length > 0.5) {
        const detail = [...counts.entries()].map(([position, count]) => `${position}:${count}`).join(", ")
        const places = prompted.map(({ item, activity, index }) => {
          const position = correctPosition(
            item.choices,
            item.correctId,
            choiceSeed(`${keyPrefix}/${week.id}`, activity, index),
          )
          return `${activity}${index}:${position}`
        })
        balanceProblems.push(`${keyPrefix}/${week.id} (${detail}) ${places.join(" ")}`)
      }
    }

    const found: ActivityId[] = []
    for (const id of ACTIVITY_IDS) {
      if (hasActivity(week, id)) found.push(id)
    }
    const order = week.activityOrder
    if (!order?.length) throw new Error(`${keyPrefix}/${week.id} needs activityOrder.`)
    if (new Set(order).size !== order.length) {
      throw new Error(`${keyPrefix}/${week.id} repeats an activity.`)
    }
    const same =
      order.length === found.length && order.every((id) => found.includes(id)) && found.every((id) => order.includes(id))
    if (!same) {
      throw new Error(
        `${keyPrefix}/${week.id} activityOrder (${order.join(", ")}) does not match content (${found.join(", ")}).`,
      )
    }
    if (week.quiz.length > 0 && order[order.length - 1] !== "quiz") {
      throw new Error(`${keyPrefix}/${week.id} must end with the quiz.`)
    }

    if (week.sort) {
      if (week.sort.bins.length < 2 || week.sort.bins.length > 4) {
        throw new Error(`${keyPrefix}/${week.id} sort needs 2 to 4 bins.`)
      }
      const binIds = new Set(week.sort.bins.map((bin) => bin.id))
      for (const item of week.sort.items) {
        if (!binIds.has(item.binId)) throw new Error(`${keyPrefix}/${week.id} sort bin is missing: ${item.text}`)
      }
    }
    for (const item of week.tapWord ?? []) {
      if (item.correctIndex < 0 || item.correctIndex >= item.words.length) {
        throw new Error(`${keyPrefix}/${week.id} tap-word index is missing.`)
      }
    }
    for (const item of week.fillGap ?? []) {
      assertChoices(item.choices, item.correctId, `${item.before}_${item.after}`)
    }
    for (const item of week.fixIt ?? []) {
      if (item.wrongIndex < 0 || item.wrongIndex >= item.words.length) {
        throw new Error(`${keyPrefix}/${week.id} fix-it index is missing.`)
      }
      assertChoices(item.choices, item.correctId, item.words.join(" "))
    }
    for (const item of week.builder ?? []) {
      if (item.tiles.length < 3) throw new Error(`${keyPrefix}/${week.id} builder needs at least 3 tiles.`)
      const idsInItem = [...item.tiles, ...(item.extraTiles ?? [])].map((tile) => tile.id)
      if (new Set(idsInItem).size !== idsInItem.length) {
        throw new Error(`${keyPrefix}/${week.id} builder tile ids must be unique.`)
      }
    }
    for (const item of week.sequence ?? []) {
      if (item.steps.length < 3) throw new Error(`${keyPrefix}/${week.id} sequence needs at least 3 steps.`)
    }
    for (const passage of week.reading ?? []) {
      if (!passage.pages.length || !passage.questions.length) {
        throw new Error(`${keyPrefix}/${week.id} reading needs pages and questions.`)
      }
      for (const question of passage.questions) assertPrompt(question)
    }
    for (const item of week.paragraph ?? []) {
      if (!item.guides.length) throw new Error(`${keyPrefix}/${week.id} paragraph needs a guide question.`)
      for (const guide of item.guides) {
        if (guide.choices.length < 2) throw new Error(`${keyPrefix}/${week.id} paragraph needs a choice.`)
      }
    }
    for (const item of week.numberPad ?? []) {
      if (!Number.isInteger(item.answer)) throw new Error(`${keyPrefix}/${week.id} number pad answer is not whole.`)
      if (item.level !== 1 && item.level !== 2 && item.level !== 3) {
        throw new Error(`${keyPrefix}/${week.id} number pad level is missing.`)
      }
    }
    for (const item of week.arrays ?? []) {
      if (item.rows < 1 || item.cols < 1) throw new Error(`${keyPrefix}/${week.id} array is empty.`)
    }
    for (const item of week.columnMultiply ?? []) {
      if (!Number.isInteger(item.top) || !Number.isInteger(item.bottom) || item.top < 0 || item.bottom < 1) {
        throw new Error(`${keyPrefix}/${week.id} column multiply factors are not valid.`)
      }
      const product = item.top * item.bottom
      const steps = columnSteps(item.top, item.bottom)
      const fromSteps = steps.reduce((sum, step, index) => sum + step.write * 10 ** index, 0)
      if (fromSteps !== product) {
        throw new Error(`${keyPrefix}/${week.id} ${item.top} × ${item.bottom} steps do not make ${product}.`)
      }
      const carry = hasColumnCarry(item.top, item.bottom)
      if (item.level === 1 && carry) {
        throw new Error(`${keyPrefix}/${week.id} level 1 has a carry: ${item.top} × ${item.bottom}.`)
      }
      if (item.level === 2 && !carry) {
        throw new Error(`${keyPrefix}/${week.id} level 2 has no carry: ${item.top} × ${item.bottom}.`)
      }
    }
    for (const item of week.zeroPattern ?? []) {
      if (
        !Number.isInteger(item.factorA) ||
        !Number.isInteger(item.factorB) ||
        !Number.isInteger(item.zeros) ||
        item.factorA < 0 ||
        item.factorB < 0 ||
        item.zeros < 1
      ) {
        throw new Error(`${keyPrefix}/${week.id} zero pattern is not valid.`)
      }
      const basic = item.factorA * item.factorB
      const shown = basic * 10 ** item.zeros
      const appended = Number(`${basic}${"0".repeat(item.zeros)}`)
      if (!Number.isSafeInteger(shown) || appended !== shown) {
        throw new Error(`${keyPrefix}/${week.id} zero pattern result does not match ${basic} and ${item.zeros} zeros.`)
      }
    }
    for (const item of week.skipCount ?? []) {
      if (item.step < 1 || item.hops < 1) throw new Error(`${keyPrefix}/${week.id} skip count is not valid.`)
    }
    if (week.barGraph) {
      if (week.barGraph.bars.length < 2) throw new Error(`${keyPrefix}/${week.id} bar graph needs bars.`)
      for (const question of week.barGraph.questions) assertQuizItem(question)
    }
    if (week.probability) {
      for (const event of week.probability.events) {
        if (!PROBABILITY.includes(event.answer)) {
          throw new Error(`${keyPrefix}/${week.id} probability word is missing.`)
        }
      }
    }
    for (const fact of week.fingerTrick?.facts ?? []) {
      if (!Number.isInteger(fact) || fact < 1 || fact > 10) {
        throw new Error(`${keyPrefix}/${week.id} finger trick fact must be 1 to 10.`)
      }
    }
    for (const item of week.labelDiagram?.items ?? []) {
      const regions = item.kind === "keyboard" ? KEY_IDS : FINGER_IDS
      if (item.correctIds.length < 1) {
        throw new Error(`${keyPrefix}/${week.id} diagram needs a region: ${item.prompt}`)
      }
      if (new Set(item.correctIds).size !== item.correctIds.length) {
        throw new Error(`${keyPrefix}/${week.id} diagram repeats a region: ${item.prompt}`)
      }
      for (const id of item.correctIds) {
        if (!regions.includes(id)) {
          throw new Error(`${keyPrefix}/${week.id} diagram region is missing: ${id}`)
        }
      }
    }
    for (const item of week.keyboard ?? []) {
      if (!targetKeyIds(item.target)) {
        throw new Error(`${keyPrefix}/${week.id} keyboard target is not on the layout: ${item.target}`)
      }
    }
    for (const item of week.fileDesk ?? []) {
      assertFileDesk(item, `${keyPrefix}/${week.id}`)
    }
    for (const item of week.searchPractice ?? []) {
      assertChoices(item.queries, item.correctQueryId, item.query)
      const query = item.queries.find((choice) => choice.id === item.correctQueryId)
      if (query?.label !== item.query) {
        throw new Error(`${keyPrefix}/${week.id} search query does not match its chip: ${item.query}`)
      }
      if (item.results.length < 2) {
        throw new Error(`${keyPrefix}/${week.id} search needs two results: ${item.query}`)
      }
      const result = item.results.find((entry) => entry.id === item.correctId)
      if (!result?.useful) {
        throw new Error(`${keyPrefix}/${week.id} search answer is not a useful result: ${item.query}`)
      }
      if (item.facts?.length) {
        if (!item.bins || item.bins.length < 2 || item.bins.length > 4) {
          throw new Error(`${keyPrefix}/${week.id} search facts need 2 to 4 bins.`)
        }
        const binIds = new Set(item.bins.map((bin) => bin.id))
        for (const fact of item.facts) {
          if (!binIds.has(fact.binId)) {
            throw new Error(`${keyPrefix}/${week.id} search fact bin is missing: ${fact.text}`)
          }
        }
      }
    }
  }
  if (balanceProblems.length > 0) {
    throw new Error(balanceProblems.join("\n"))
  }
}
