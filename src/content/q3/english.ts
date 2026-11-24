import { ask } from "../ask.ts"
import { checkSubjectWeeks } from "../checks.ts"
import type { WeekContent } from "../types.ts"

export const englishWeeks: WeekContent[] = [
  {
    id: "w14",
    title: "Interrogative Pronouns",
    badgeName: "Question Words",
    activityOrder: ["recap", "fillGap", "matching", "builder", "quiz"],
    recap: [
      { speaker: "ana", text: "Interrogative pronouns ask questions. Who asks about a person." },
      { speaker: "ben", text: "Whom also asks about a person. It is the formal word, often after to or for." },
      { speaker: "ana", text: "Whose asks about the owner. Which asks about a choice. What asks about a thing." },
      { speaker: "ben", text: "Which do you like more, adobo or sinigang? The word do belongs in that question." },
      { speaker: "ana", text: "Whose book is this? It is Ana's. Whose is the only word that fits, because the next sentence names the owner." },
    ],
    fillGap: [
      {
        before: "",
        after: " is knocking at the door?",
        choices: [
          { id: "who", label: "Who" },
          { id: "what", label: "What" },
          { id: "whose", label: "Whose" },
        ],
        correctId: "who",
        explanation: "A person is knocking. Who asks about a person.",
      },
      {
        before: "",
        after: " bag is this? It is Ana's.",
        choices: [
          { id: "whose", label: "Whose" },
          { id: "which", label: "Which" },
          { id: "what", label: "What" },
        ],
        correctId: "whose",
        explanation: "Ana's names the owner, so the question word is Whose.",
      },
      {
        before: "",
        after: " do you like more, adobo or sinigang?",
        choices: [
          { id: "which", label: "Which" },
          { id: "who", label: "Who" },
          { id: "whom", label: "Whom" },
        ],
        correctId: "which",
        explanation: "Which asks about a choice. The question needs do: Which do you like more?",
      },
      {
        before: "",
        after: " is inside the box?",
        choices: [
          { id: "what", label: "What" },
          { id: "who", label: "Who" },
          { id: "whose", label: "Whose" },
        ],
        correctId: "what",
        explanation: "What asks about a thing.",
      },
      {
        before: "To ",
        after: " did Ana give the note?",
        choices: [
          { id: "whom", label: "whom" },
          { id: "what", label: "what" },
          { id: "which", label: "which" },
        ],
        correctId: "whom",
        explanation: "Whom is the formal word for a person after to.",
      },
    ],
    matching: [
      { left: "Who", right: "A person" },
      { left: "Whom", right: "A person, formal" },
      { left: "Whose", right: "The owner" },
      { left: "Which", right: "A choice" },
      { left: "What", right: "A thing" },
    ],
    builder: [
      {
        prompt: "Build the question.",
        tiles: [
          { id: "whose", text: "Whose" },
          { id: "bag", text: "bag" },
          { id: "is", text: "is" },
          { id: "this", text: "this?" },
        ],
        extraTiles: [{ id: "who", text: "Who" }],
        explanation: "Whose bag is this? Whose asks about the owner.",
      },
      {
        prompt: "Build the question about a choice.",
        tiles: [
          { id: "which", text: "Which" },
          { id: "do", text: "do" },
          { id: "you", text: "you" },
          { id: "like", text: "like?" },
        ],
        extraTiles: [{ id: "what", text: "What" }],
        explanation: "Which do you like? The word do belongs in the question.",
      },
    ],
    quiz: [
      ask("Which word asks about a person?", ["Who", "What", "Which"], 0, "Who asks about a person."),
      ask("Which word asks about the owner?", ["What", "Whose", "Whom"], 1, "Whose asks who owns something."),
      ask("______ do you like more, milk or juice?", ["Which", "Whose", "Whom"], 0, "Which asks about a choice, and do belongs in the question."),
      ask("To ______ should I send this?", ["whom", "what", "whose"], 0, "Whom is used for a person after to."),
      ask("______ is in your bag?", ["What", "Whose", "Whom"], 0, "What asks about a thing."),
      ask("______ pencil is on the desk? It is Ben's.", ["Whose", "Which", "What"], 0, "The next sentence names the owner, so Whose is the answer."),
      ask("Interrogative pronouns are used to…", ["ask questions", "name every noun", "end a story"], 0, "These five words ask questions. They are not the definition of all pronouns."),
      ask("Which sentence is correct?", ["Which do you like more?", "Which you like more?", "Whose do you person?"], 0, "Which do you like more? is the complete question."),
      ask("Whom is most like which word?", ["Who", "What", "Whose"], 0, "Whom and who both ask about a person. Whom is the formal one."),
      ask("A choice between two games needs which word?", ["Which", "Whose", "Whom"], 0, "Which asks you to choose."),
    ],
  },
  {
    id: "w15",
    title: "Feelings and Traits",
    badgeName: "Feelings and Traits",
    activityOrder: ["recap", "reading", "sort", "riddles", "quiz"],
    recap: [
      { speaker: "ana", text: "A feeling is how a character feels right now. Happy, nervous, and bored are feelings." },
      { speaker: "ben", text: "A trait is what a character is like. Helpful, honest, shy, and polite are traits." },
      { speaker: "ana", text: "We infer from clues: what they say, how they say it, and what they do." },
      { speaker: "ben", text: "Joy picked up her classmate's pencils. That action is a clue that she is helpful." },
      { speaker: "ana", text: "The same person can feel nervous and still show the trait honest." },
    ],
    reading: [
      {
        title: "Joy",
        pages: [{ text: "Joy saw her classmate drop a box of pencils. She quickly knelt and helped pick them up. She smiled as she handed them back." }],
        questions: [
          ask("How does Joy feel?", ["Glad", "Bored", "Angry"], 0, "She smiled while she helped. Glad is the feeling right now."),
          ask("What trait does Joy show?", ["Helpful", "Shy", "Dishonest"], 0, "She chose to help. Helpful is the trait."),
        ],
      },
      {
        title: "Mark",
        pages: [{ text: "Mark wanted to play, but the test was tomorrow. He stayed at his desk and studied until he could say every answer." }],
        questions: [
          ask("How might Mark feel while he studies?", ["Nervous", "Bored and finished", "Asleep"], 0, "The test is tomorrow, so he may feel nervous. Nervous is the feeling."),
          ask("What trait does Mark show?", ["Hardworking", "Careless", "Rude"], 0, "Staying to study shows that he is hardworking."),
        ],
      },
      {
        title: "Mia",
        pages: [{ text: "A strong wind blew Mia's paper boat into the pond. She looked sad for a moment, then she smiled and folded a new one." }],
        questions: [
          ask("How does Mia feel at the end?", ["Cheerful again", "Furious", "Bored"], 0, "She smiled and tried again. She feels cheerful again."),
          ask("What trait does Mia show?", ["Patient", "Selfish", "Dishonest"], 0, "She does not give up. Patient is the trait."),
        ],
      },
    ],
    sort: {
      bins: [
        { id: "feeling", label: "Feeling" },
        { id: "trait", label: "Trait" },
      ],
      items: [
        { text: "happy", binId: "feeling", explanation: "Happy is how someone feels right now. It is a feeling." },
        { text: "nervous", binId: "feeling", explanation: "Nervous is a feeling in the moment." },
        { text: "bored", binId: "feeling", explanation: "Bored is a feeling, not a lasting trait." },
        { text: "helpful", binId: "trait", explanation: "Helpful is what a person is like. It is a trait." },
        { text: "honest", binId: "trait", explanation: "Honest is a trait. It shows in what a person does." },
        { text: "shy", binId: "trait", explanation: "Shy describes what someone is like. It is a trait." },
        { text: "polite", binId: "trait", explanation: "Polite is a trait." },
      ],
    },
    riddles: [
      ask("“Help! There is a wolf!” Who said it?", ["The shepherd boy", "The tortoise", "The dove"], 0, "The boy who cried wolf shouted that there was a wolf."),
      ask("“Climb on this leaf.” Who said it?", ["The dove", "The hare", "The villagers"], 0, "In The Ant and the Dove, the dove offers the leaf."),
      ask("“Slow and steady wins the race.” Who said it?", ["The hare", "The tortoise", "The lion"], 1, "The tortoise says that slow and steady wins."),
      ask("“Please don’t eat me.” Who said it?", ["The mouse", "The queen", "The shepherd boy"], 0, "The mouse asks the lion not to eat him."),
      ask("“You will never beat me.” Who said it?", ["The hare", "The ant", "The dove"], 0, "The hare boasts that no one will beat him."),
    ],
    quiz: [
      ask("A feeling is…", ["how a character feels now", "a kind of house", "a question word"], 0, "A feeling is what is happening inside right now."),
      ask("A trait is…", ["what a character is like", "the setting of a story", "a punctuation mark"], 0, "A trait is a quality, such as honest or helpful."),
      ask("Which word is a feeling?", ["nervous", "helpful", "honest"], 0, "Nervous is a feeling. Helpful and honest are traits."),
      ask("Which word is a trait?", ["polite", "bored", "happy"], 0, "Polite is a trait. Bored and happy are feelings."),
      ask("Which clue helps you infer?", ["What the character does", "The page number", "The color of the border"], 0, "Actions, words, and tone are the clues."),
      ask("Ana tells the teacher she broke the vase. What trait is that?", ["Honest", "Shy", "Bored"], 0, "Telling the truth shows that she is honest."),
      ask("Ben hides behind Ana and speaks softly at a party. What trait is that?", ["Shy", "Helpful", "Loud"], 0, "Hiding and a soft voice are clues that he is shy."),
      ask("Which pair is feeling then trait?", ["glad, then helpful", "helpful, then glad", "desk, then chair"], 0, "Glad is the feeling. Helpful is the trait."),
      ask("Mia smiles and tries again. Which trait fits?", ["Patient", "Rude", "Careless"], 0, "Trying again is a clue that she is patient."),
      ask("Can a feeling and a trait be different?", ["Yes. She can feel nervous and still be honest.", "No. They are the same word.", "Only in math"], 0, "A feeling is for now. A trait is what the person is like."),
    ],
  },
  {
    id: "w16",
    title: "Cause and Effect",
    badgeName: "Cause and Effect",
    activityOrder: ["recap", "sort", "matching", "builder", "quiz"],
    recap: [
      { speaker: "ana", text: "A cause is why it happened. An effect is what happened." },
      { speaker: "ben", text: "Because, since, and due to point to the cause." },
      { speaker: "ana", text: "So, therefore, thus, and consequently point to the effect." },
      { speaker: "ben", text: "The rain fell, so the picnic stopped. The rain is the cause. The picnic stopping is the effect." },
      { speaker: "ana", text: "She stayed home because she was not feeling well. Was, not is, because the staying already happened." },
    ],
    sort: {
      bins: [
        { id: "cause", label: "Cause" },
        { id: "effect", label: "Effect" },
      ],
      items: [
        { text: "The rain fell hard.", binId: "cause", explanation: "The rain is why something else happened. It is the cause." },
        { text: "The ground got wet.", binId: "effect", explanation: "The wet ground is what happened. It is the effect." },
        { text: "Ben forgot his lunch.", binId: "cause", explanation: "Forgetting lunch is the cause of what comes next." },
        { text: "Ana shared her sandwich.", binId: "effect", explanation: "Sharing is what happened because Ben forgot his lunch." },
        { text: "The glass slipped.", binId: "cause", explanation: "The slip is why the next event happened." },
        { text: "The milk spilled.", binId: "effect", explanation: "The spill is the effect." },
      ],
    },
    matching: [
      { left: "The rain fell.", right: "The picnic stopped." },
      { left: "Ben forgot his lunch.", right: "Ana shared her food." },
      { left: "The glass slipped.", right: "The milk spilled." },
      { left: "She was not feeling well.", right: "She stayed home." },
    ],
    builder: [
      {
        prompt: "Build a sentence with because.",
        tiles: [
          { id: "grass", text: "The grass is wet" },
          { id: "because", text: "because" },
          { id: "rain", text: "it rained." },
        ],
        extraTiles: [{ id: "so", text: "so" }],
        explanation: "Because introduces the cause: it rained.",
      },
      {
        prompt: "Build a sentence with so.",
        tiles: [
          { id: "rained", text: "It rained," },
          { id: "so", text: "so" },
          { id: "picnic", text: "the picnic stopped." },
        ],
        extraTiles: [{ id: "because", text: "because" }],
        explanation: "So introduces the effect: the picnic stopped.",
      },
    ],
    quiz: [
      ask("The cause is…", ["why it happened", "the result", "a question word"], 0, "The cause is the reason."),
      ask("The effect is…", ["what happened", "why it started", "the title"], 0, "The effect is the result or outcome."),
      ask("Which word points to a cause?", ["because", "so", "therefore"], 0, "Because, since, and due to point to the cause."),
      ask("Which word points to an effect?", ["so", "because", "since"], 0, "So, therefore, thus, and consequently point to the effect."),
      ask("The bus was late, so Ana missed the bell. What is the effect?", ["Ana missed the bell.", "The bus was late.", "Ana has a bag."], 0, "Missing the bell is what happened. That is the effect."),
      ask("Which sentence is correct?", ["She stayed home because she was not feeling well.", "She stayed home because she is not feeling well.", "She stayed home so she was not feeling well."], 0, "Was matches the past. Because introduces the cause."),
      ask("Goldilocks ate their food, broke a chair, and slept in a bed. Those are…", ["effects of her visit", "three causes with no result", "question words"], 0, "What she did in the house is the effect of her coming in."),
      ask("Which words do we leave out of this lesson?", ["if, when, and then", "because and so", "therefore and thus"], 0, "If, when, and then are mainly time or condition words."),
      ask("Due to the storm, the game stopped. What is the cause?", ["the storm", "the game", "the word due"], 0, "Due to points to the cause: the storm."),
      ask("It was hot, therefore we drank water. What is the effect?", ["We drank water.", "It was hot.", "Therefore is a noun."], 0, "Therefore points to the effect: we drank water."),
    ],
  },
  {
    id: "w17",
    title: "Predicting Outcomes",
    badgeName: "Prediction",
    activityOrder: ["recap", "reading", "quiz"],
    recap: [
      { speaker: "ana", text: "A prediction is a believable guess about what happens next." },
      { speaker: "ben", text: "Use the clues in the story and what you already know." },
      { speaker: "ana", text: "One ending should match the clues. A silly ending and an ending that ignores the clues do not." },
      { speaker: "ben", text: "What do we mean by predicting? We say what we think will happen next." },
    ],
    reading: [
      {
        title: "The Golden Touch",
        pages: [
          { text: "King Midas loved gold. He wished that everything he touched would turn to gold. His wish came true." },
          { text: "He touched his food, and it became hard gold. He could not eat. Then his daughter ran to him." },
        ],
        questions: [
          ask("What happens next?", ["He will want the wish taken back.", "He turns into a goldfish and swims away.", "He opens a bakery and sells bread."], 0, "The clues say gold has become a problem. A believable ending is that he wants the wish undone. The goldfish is silly, and a bakery does not match the clues."),
        ],
      },
      {
        title: "The Lion and the Poor Slave",
        pages: [
          { text: "A poor man helped a lion by pulling a thorn from its paw. Later the man was sent into the arena, and that same lion was set loose." },
        ],
        questions: [
          ask("What will the lion do?", ["It will not hurt the man who helped it.", "They will play basketball.", "The lion will fly out of the arena."], 0, "The lion remembers the help. Sparing the man matches the clue. Basketball and flying do not."),
        ],
      },
      {
        title: "The Ant and the Dove",
        pages: [
          { text: "An ant fell into the water. A dove dropped a leaf, and the ant climbed on. Later the ant saw a hunter aiming at the dove." },
        ],
        questions: [
          ask("What will the ant do?", ["It will help the dove.", "It will buy a boat.", "The dove will forget how to fly."], 0, "The ant was saved, so a believable next step is that the ant helps the dove. The other endings do not match the clues."),
        ],
      },
    ],
    quiz: [
      ask("A good prediction is…", ["believable from the clues", "the silliest idea", "a guess with no clues"], 0, "Use the story and what you know."),
      ask("What do we mean by predicting?", ["Saying what we think will happen next", "Copying the title", "Naming a pronoun"], 0, "We say what we think will happen next."),
      ask("Which ending matches a king who cannot eat his gold food?", ["He asks for the wish to end.", "He becomes a goldfish.", "He starts a bakery."], 0, "The food clue points to regretting the wish."),
      ask("The lion remembers the man who removed the thorn. What is believable?", ["The lion lets him live.", "They play basketball.", "The lion flies away."], 0, "Remembering the help points to mercy."),
      ask("The ant was saved by the dove. A hunter aims at the dove. What fits?", ["The ant will help the dove.", "The ant buys a boat.", "The dove forgets how to fly."], 0, "The earlier help is a clue that the ant will return the favor."),
      ask("Why reject a silly ending?", ["It does not follow the clues.", "It is too short.", "It has a period."], 0, "A prediction has to match the story."),
      ask("Which sentence is correct?", ["Write what you think will happen next.", "Write what you think what happen next.", "Put it on coffee table."], 0, "Will happen next is the clear sentence."),
      ask("Where do clues come from?", ["The story and your own experience", "Only the page number", "A timer"], 0, "Both the text and what you know can help."),
      ask("Midas touches his daughter after the wish. What is believable?", ["She begins to turn to gold.", "She becomes a question word.", "The story turns into a bar graph."], 0, "The wish says everything he touches turns to gold."),
      ask("A prediction is a fact you already read. True or false?", ["False. It is a careful guess.", "True. It must already be on the page.", "True, but only in myths."], 0, "You use clues to guess what has not happened yet."),
    ],
  },
  {
    id: "w18",
    title: "Retelling a Story",
    badgeName: "Storyteller",
    activityOrder: ["recap", "sequence", "sort", "matching", "quiz"],
    recap: [
      { speaker: "ana", text: "A retelling uses your own words. It keeps the beginning, the middle, and the end." },
      { speaker: "ben", text: "A myth tries to explain the world. Myths come from many cultures, including stories about Bathala." },
      { speaker: "ana", text: "A legend is a story about a hero or a place, and it may have started from something real. A fable uses animals and teaches a lesson." },
      { speaker: "ben", text: "Name the characters, the setting, the problem, and the solution." },
      { speaker: "ana", text: "Retelling lets you share a story and show that you understand it." },
    ],
    sequence: [
      {
        prompt: "Put Graham's zoo story in order.",
        steps: [
          "Graham and his family were at the zoo.",
          "Graham was lost and could not find his parents.",
          "An older lady helped Graham find his parents.",
        ],
        explanation: "Beginning: they are at the zoo. Middle: Graham is lost. End: the lady helps him.",
      },
      {
        prompt: "Put this retelling of Snow White in order.",
        steps: [
          "The Queen learns that Snow White is the fairest.",
          "Snow White runs into the forest and stays with the dwarfs.",
          "The Queen gives her a poisoned apple.",
          "A kiss wakes Snow White, and they live happily.",
        ],
        explanation: "The problem grows from the Queen's jealousy to the apple, and the end is the waking.",
      },
    ],
    sort: {
      bins: [
        { id: "myth", label: "Myth" },
        { id: "legend", label: "Legend" },
        { id: "fable", label: "Fable" },
      ],
      items: [
        { text: "A story about Bathala that explains the world.", binId: "myth", explanation: "A myth explains the world and can come from any culture, including the Philippines." },
        { text: "Why the sky is high, told with gods.", binId: "myth", explanation: "Explaining nature with gods is a myth." },
        { text: "A story from a real place about a hero.", binId: "legend", explanation: "A legend often grows from a real place or hero." },
        { text: "The Ant and the Dove, with a lesson.", binId: "fable", explanation: "Animals and a lesson make a fable." },
        { text: "Animals talk and teach the reader a lesson.", binId: "fable", explanation: "That is what a fable does." },
      ],
    },
    matching: [
      { left: "Characters", right: "Graham, his parents, and a lady" },
      { left: "Setting", right: "The zoo" },
      { left: "Problem", right: "Graham was lost" },
      { left: "Solution", right: "The lady helped him" },
    ],
    quiz: [
      ask("A retelling should use…", ["your own words", "only the title", "a new ending that ignores the story"], 0, "Retelling keeps the story but uses your words."),
      ask("Which order is right?", ["Beginning, middle, end", "End, title, middle", "Problem only"], 0, "Start at the beginning, tell the middle, and finish with the end."),
      ask("Myths come from…", ["many cultures, including the Philippines", "only Greek gods", "only fables about ants"], 0, "Myths are told in many cultures. Bathala is one example."),
      ask("A fable usually has…", ["animals and a lesson", "only a map", "no problem"], 0, "The lesson is the point of a fable."),
      ask("In Graham's story, what is the setting?", ["The zoo", "A castle", "A bakery"], 0, "Graham and his family were at the zoo."),
      ask("What is the problem?", ["Graham cannot find his parents.", "The penguins are the heroes.", "There is no lady."], 0, "Being lost is the problem."),
      ask("What is the solution?", ["A lady helps him find his parents.", "He stays lost.", "The zoo closes forever."], 0, "The lady's help is the solution."),
      ask("Which sentence is correct?", ["Retelling lets you share the story.", "Retelling let's you share the story.", "Retelling choos the title only."], 0, "Lets, not let's. Choose, not choos."),
      ask("Snow White finds safety with…", ["the dwarfs", "the hunter's horse", "King Midas"], 0, "She stays with the dwarfs in the forest."),
      ask("Which part is the end of Snow White's retelling?", ["She wakes and they live happily.", "The Queen hears she is the fairest.", "She first enters the forest."], 0, "The happy waking is the end."),
    ],
  },
  {
    id: "w19",
    title: "Possessive Pronouns",
    badgeName: "Possessive Pronouns",
    activityOrder: ["recap", "sort", "fillGap", "builder", "quiz"],
    recap: [
      { speaker: "ana", text: "Some possessive pronouns come before a noun: my, your, his, her, its, our, their." },
      { speaker: "ben", text: "Some stand alone: mine, yours, his, hers, ours, theirs. His can do both jobs." },
      { speaker: "ana", text: "That is my dog. The dog is mine. My needs the noun. Mine stands alone." },
      { speaker: "ben", text: "Its means belonging to it. It's means it is. Possessive its has no apostrophe." },
      { speaker: "ana", text: "These are her pajamas. Use are with pajamas, not is. These books belong to them. Belong, not belongs." },
    ],
    sort: {
      bins: [
        { id: "before", label: "Before a noun" },
        { id: "alone", label: "Stands alone" },
      ],
      items: [
        { text: "my", binId: "before", explanation: "My comes before a noun: my dog." },
        { text: "your", binId: "before", explanation: "Your comes before a noun: your bag." },
        { text: "her", binId: "before", explanation: "Her comes before a noun: her pajamas." },
        { text: "their", binId: "before", explanation: "Their comes before a noun: their books." },
        { text: "its", binId: "before", explanation: "Its comes before a noun: its paw. No apostrophe." },
        { text: "mine", binId: "alone", explanation: "Mine stands alone: The dog is mine." },
        { text: "yours", binId: "alone", explanation: "Yours stands alone." },
        { text: "hers", binId: "alone", explanation: "Hers stands alone. Her does not." },
        { text: "ours", binId: "alone", explanation: "Ours stands alone." },
        { text: "theirs", binId: "alone", explanation: "Theirs stands alone." },
      ],
    },
    fillGap: [
      {
        before: "That dog is",
        after: ".",
        choices: [
          { id: "mine", label: "mine" },
          { id: "my", label: "my" },
        ],
        correctId: "mine",
        explanation: "Nothing comes after the pronoun, so it stands alone: mine.",
      },
      {
        before: "This is",
        after: " dog.",
        choices: [
          { id: "my", label: "my" },
          { id: "mine", label: "mine" },
        ],
        correctId: "my",
        explanation: "A noun follows, so use my.",
      },
      {
        before: "These are",
        after: " pajamas.",
        choices: [
          { id: "her", label: "her" },
          { id: "hers", label: "hers" },
        ],
        correctId: "her",
        explanation: "Pajamas is the noun, so her comes before it. These are, not this is.",
      },
      {
        before: "The books on the desk are",
        after: ".",
        choices: [
          { id: "ours", label: "ours" },
          { id: "our", label: "our" },
        ],
        correctId: "ours",
        explanation: "The pronoun ends the sentence, so ours stands alone.",
      },
      {
        before: "The cat licked",
        after: " paw.",
        choices: [
          { id: "its", label: "its" },
          { id: "it's", label: "it's" },
        ],
        correctId: "its",
        explanation: "Its shows belonging. It's means it is.",
      },
    ],
    builder: [
      {
        prompt: "Build a sentence that stands alone.",
        tiles: [
          { id: "this", text: "This" },
          { id: "is", text: "is" },
          { id: "mine", text: "mine." },
        ],
        extraTiles: [{ id: "my", text: "my" }],
        explanation: "This is mine. Mine stands alone.",
      },
      {
        prompt: "Build a sentence with a noun after the pronoun.",
        tiles: [
          { id: "that", text: "That" },
          { id: "is", text: "is" },
          { id: "her", text: "her" },
          { id: "bag", text: "bag." },
        ],
        extraTiles: [{ id: "hers", text: "hers" }],
        explanation: "Her comes before the noun bag. Hers would stand alone.",
      },
    ],
    quiz: [
      ask("Which words come before a noun?", ["my, your, her, their", "mine, yours, hers, theirs", "only mine"], 0, "My, your, his, her, its, our, and their come before a noun."),
      ask("Which words stand alone?", ["mine, yours, hers, ours, theirs", "my, your, her, their", "its and it's"], 0, "Mine, yours, his, hers, ours, and theirs take the place of a noun."),
      ask("That dog is ___.", ["mine", "my", "mines"], 0, "Mine stands alone. There is no such word as mines."),
      ask("This is ___ dog.", ["my", "mine", "ours"], 0, "My comes before the noun dog."),
      ask("These ___ her pajamas.", ["are", "is", "belongs"], 0, "Use are with pajamas, not is: These are her pajamas."),
      ask("These books ___ to them.", ["belong", "belongs", "owned"], 0, "Books is plural, so belong. Own, not owned, for the present."),
      ask("The cat hurt ___ paw.", ["its", "it's", "hers"], 0, "Its shows belonging and has no apostrophe."),
      ask("It's raining means…", ["it is raining", "the rain belongs to it", "hers is raining"], 0, "It's means it is. That is not the possessive."),
      ask("His can…", ["come before a noun or stand alone", "only stand alone", "only mean it is"], 0, "His does both jobs: his bag, and the bag is his."),
      ask("We were stuck ___ traffic.", ["in", "on the", "at the belonging"], 0, "Stuck in traffic is the phrase. On the traffic is not."),
    ],
  },
]

checkSubjectWeeks(englishWeeks, "q3/english")
