const jokes = [
  {
    title: "Relationship status?",
    text: "I'll leave the relations to the database.",
  },
  {
    title: "How do you get the code for the bank vault?",
    text: "You checkout their branch.",
  },
  {
    title: "How did the developer announce their engagement?",
    text: "They <code>return</code>ed <code>true</code>!",
  },
  {
    title:
      "Why did the security conscious engineer refuse to pay their dinner bill?",
    text: "Because they could not verify the checksum.",
  },
  {
    title: "What do you call a busy waiter?",
    text: "A server.",
  },
  {
    title: "What do you call an idle server?",
    text: "A waiter.",
  },
  {
    title: "How many Prolog programmers does it take to change a lightbulb?",
    text: "Yes.",
  },
  {
    title: "What diet did the ghost developer go on?",
    text: "Boooooolean",
  },
  {
    title: "Why was the developer unhappy at their job?",
    text: "They wanted arrays.",
  },
  {
    title: 'Why did 10 get paid less than "10"?',
    text: "There was workplace inequality.",
  },
  {
    title: "Why was the function sad after a successful first call?",
    text: "It didn’t get a callback.",
  },
  {
    title: "Why did the angry function exceed the callstack size?",
    text: "It got into an Argument with itself",
  },
  {
    title: "Whats the object-oriented way to become wealthy?",
    text: "Inheritance",
  },
  {
    title: "Why did the developer ground their kid?",
    text: "They weren't telling the truthy",
  },
  {
    title: "What did the array say after it was extended?",
    text: "Stop objectifying me.",
  },
  {
    title: "Where did the parallel function wash its hands?",
    text: "Async",
  },
  {
    title: "I'm starting a band called HTML Encoder",
    text: "Looking to buy a guitar \\&",
  },
  {
    title: "Why did the functions stop calling each other?",
    text: "Because they had constant arguments.",
  },
  {
    title: "What's the second movie about a database engineer called?",
    text: "The SQL.",
  },
  {
    title: "Why doesn't Hollywood make more Big Data movies?",
    text: "NoSQL.",
  },
  {
    title: "What did the spider do on the computer?",
    text: "Made a website!",
  },
  {
    title: "What did the computer do at lunchtime?",
    text: "Had a byte!",
  },
  {
    title: "What does a baby computer call his father?",
    text: "Data!",
  },
  {
    title: "Why did the computer keep sneezing?",
    text: "It had a virus!",
  },
  {
    title: "What is a computer virus?",
    text: "A terminal illness!",
  },
  {
    title: "Why was the computer freezing?",
    text: "It left its Windows open!",
  },
  {
    title: "Why was there a bug in the computer?",
    text: "Because it was looking for a byte to eat?",
  },
  {
    title: "Why did the computer squeak?",
    text: "Because someone stepped on its mouse!",
  },
  {
    title: "What do you get when you cross a computer and a life guard?",
    text: "A screensaver!",
  },
  {
    title: "Where do all the cool mice live?",
    text: "In their mousepads!",
  },
  {
    title: "What do you get when you cross a computer with an elephant?",
    text: "Lots of memory!",
  },
  {
    title: "How do programming pirates pass method parameters?",
    text: "Varrrrarrrgs.",
  },
  {
    title: "How do programming shepherds count their flock?",
    text: "With lambda functions",
  },
  {
    title: "What airline do developers prefer when they're in a rush?",
    text: "Delta.",
  },
  {
    title: "How did pirates collaborate before computers?",
    text: "Pier to pier networking.",
  },
  {
    title: "Why don't bachelors like Git?",
    text: "Because they are afraid to commit.",
  },
  {
    title: "A SQL query goes into a bar, walks up to two tables and asks:",
    text: "Can I JOIN you?",
  },
  {
    title: "How does a developer make a cheer?",
    text: '["hip","hip"] // (hip hip array!)',
  },
  {
    title: "Why was the developer's family upset with them at dinner?",
    text: "They forgot to git squash before going home",
  },
  {
    title: "What did JavaScript call his son?",
    text: "JSON!",
  },
  {
    title: "What did the proud React component say to its child?",
    text: "I've got to give you props",
  },
  {
    title: "What did the server say to his client who was having a bad day?",
    text: "Everything's going to be 200",
  },
  {
    title: "Why did the developer go broke?",
    text: "Because they used up all their cache",
  },
  {
    title: "Are computers dangerous?",
    text: "Nah, they don't byte. They just nibble a bit.",
  },
  {
    title: "How did the mafioso kill the Node server?",
    text: "Tie await to it and let it async.",
  },
  {
    title: "You know what the best thing about booleans is?",
    text: "Even if you are wrong, you are only off by a bit.",
  },
  {
    title: "Why couldn’t the user update a file on a shared server?",
    text: "They didn’t have the write permissions",
  },
  {
    title: "What do you do when you can't understand your husband's behavior?",
    text: "man man",
  },
  {
    title: "What do you call a doctor who fixes websites?",
    text: "A URLogist",
  },
  {
    title: "How many developers does it take to change a light bulb?",
    text: "None. It's a hardware issue",
  },
  {
    title: "Why do programmers always mix up Halloween and Christmas?",
    text: "Because 31 OCT == 25 DEC",
  },
  {
    title: "Why do kayakers make bad programmers?",
    text: "Because they're afraid of waterfall.",
  },
  {
    title: "What are computers' favorite snacks?",
    text: "Microchips, phish sticks, and cookies. But just a few bytes of each.",
  },
  {
    title: "What do computers love to do at the beach?",
    text: "Put on some spam block for protection so they can safely surf the net while catching some .WAVs!",
  },
  {
    title: "What do you call a computer that sings?",
    text: "A-dell.",
  },
  {
    title: "What's a compiler developer's favorite spice?",
    text: "Parsley.",
  },
  {
    title: "When do front end developers go out to eat?",
    text: "On their lunch <code>&lt;&#98;&#114;&gt;</code>.",
  },
  {
    title: "A SQL developer walked into a NoSQL bar.",
    text: "They left because they couldn't find a table.",
  },
  {
    title: "How do you help JS errors?",
    text: "You <code>console</code> them!",
  },
  {
    title: "Why don't parents teach their kids about regular expressions?",
    text: "Because they don't want them playing with matches",
  },
  {
    title: "Why didn't the <code>div</code> get invited to the dinner party?",
    text: "Because it had no <code>class</code>!",
  },
  {
    title: "Why aren't cryptocurrency engineers allowed to vote?",
    text: "Because they're miners!",
  },
  {
    title: "Why did the constant break up with the variable?",
    text: "Because they changed.",
  },
  {
    title: "Why did the database administrator leave his wife?",
    text: "She had one-to-many relationships.",
  },
  {
    title: "What did the Class say in court when put on trial?",
    text: "I strongly object!",
  },
  {
    title: "Why do Java developers wear glasses?",
    text: "Because they don't C#!",
  },
  {
    title: "What are the three hardest problems in computer science?",
    text: "Naming things and off-by-one errors",
  },
  {
    title: "What did the fruit basket say to the developer?",
    text: "I hope you're ready for some pear programming!",
  },
  {
    title: "How does a sysadmin keep a fire going?",
    text: "They rotate the logs.",
  },

  {
    title: "I love you and I only love you. Does that turn you on?",
    text: "ATE:** No.",
  },
  {
    title: "Why do all HTML emails get blocked?",
    text: "Because they are all <code>span</code>",
  },
  {
    title:
      "What did the process say after working in an infinite loop all day?",
    text: "I need a break.",
  },
  {
    title: "An Agent died unexpectedly. How was the crime solved?",
    text: "By looking at the Stack Trace.",
  },
  {
    title: "Why did the document store go out of business?",
    text: "It had NoSQL.",
  },
  {
    title: "Why can't SQL and NoSQL Developers date one other?",
    text: "Because they don't agree on relationships.",
  },
  {
    title: "Why is Python like the Soviet Union?",
    text: "Because it has no private fields",
  },
  {
    title: "Where did the API go to eat?",
    text: "To the RESTaurant",
  },
  {
    title: "Why shouldn't you trust Matlab developers?",
    text: "Because they're always plotting something.",
  },
  {
    title: "Why did the developer have to quit smoking?",
    text: "Because they couldn't afford to pay the new syntax.",
  },
  {
    title: "How does a programmer open a jar for their significant other?",
    text: "They install Java",
  },
  {
    title: "What did the psychic say to the developers?",
    text: "I see dev people.",
  },
  {
    title: "Where does the pirate stash all of their digital treasures?",
    text: "RAR",
  },
  {
    title: "What is React's favorite movie genre?",
    text: "Suspense",
  },
  {
    title: "Why couldn't the React component understand the joke?",
    text: "Because it didn't get the context.",
  },
  {
    title: "What did XHR say to AJAX when it thought it was being a Mean Girl?",
    text: "Stop trying to make fetch happen!",
  },
  {
    title: "What was Grace Hopper's favorite car?",
    text: "VW Bug",
  },
  {
    title:
      'What sits on a pirate\'s shoulder and calls, "Pieces of seven, Pieces of seven"?',
    text: "Parroty error.",
  },
  {
    title: "What is a pirate's favorite programming language?",
    text: "You'd think it was R, but a pirate's first love is Objectively C.",
  },
  {
    title: 'Why did the programmer come home crying?"',
    text: "His friends were always boolean him.",
  },
  {
    title:
      "What PostgreSQL library should Python developers use for adult-oriented code?",
    text: "psycoPG13",
  },
  {
    title:
      "What accommodations did the JavaScript developer request at the hotel?",
    text: "A room with a Vue.",
  },
  {
    title: "Where do developers drink?",
    text: "The Foo bar",
  },
  {
    title: "Why do assembly programmers need to know how to swim?",
    text: "Because they work below C level.",
  },
  {
    title: "Who used the internet before it was cool?",
    text: "Httpsters",
  },
  {
    title: "What kind of computer can hold a musical note?",
    text: "A Dell.",
  },
  {
    title: "Why did the web developer always go to the wrong hotel room?",
    text: "They were in room 301.",
  },
  {
    title: "How do you stop a web developer stealing your stuff?",
    text: "Write 403 on it.",
  },
  {
    title: "Why are machine learning models so fit?",
    text: "Because they do weight training.",
  },
  {
    title: "Why did Gargamel shut down the internet?",
    text: "Because he didn't want people **SMURFING** the web!",
  },
  {
    title: "What did the command line die of?",
    text: "A Terminal illness.",
  },
  {
    title: "Did you hear what the clumsy cryptographer did to their password?",
    text: "Made a hash of it.",
  },
  {
    title: "Why are keyboards always working so hard?",
    text: "Cause they have two shifts!",
  },
  {
    title: "What are clouds made of?",
    text: "Mostly linux servers.",
  },
  {
    title: "How does Mr. Potato Head (dev edition 0.0.1) remove his mustache?",
    text: "git stache pop",
  },
  {
    title: "Why can't you use 'Soup' as your password?",
    text: "Because it isn't <code>stroganoff</code>",
  },
  {
    title: "Why do developers use mechanical keyboards?",
    text: "To strongly type their code.",
  },
  {
    title: "What is a developer's favorite country song?",
    text: "Hello World - by Lady Antebellum",
  },
  {
    title: "Why was nobody given food at the developer conference?",
    text: "It was a serverless function!",
  },
  {
    title: "Why did the developer cancel their dinner plans?",
    text: "They were unable to fulfil peer dependencies",
  },
  {
    title: "Why did the functional programmer finally move out of their house?",
    text: "For(e) closure",
  },
  {
    title: "How do JavaScript developers break up?",
    text: "They always promise to callback",
  },
  {
    title: "Why do developers mixup Terminals and Polygraphs?",
    text: "Because they both can see a lie (CLI)",
  },
  {
    title: "Did you hear about the programmer that was scared of IDEs?",
    text: "They retreated back into their shell",
  },
  {
    title: "What do you call optimistic front-end developers?",
    text: "Stack half-full developers.",
  },
  {
    title: "Have you heard the one about the Corduroy pillow?",
    text: "It's making HEADLINES!",
  },
  {
    title: "Hey officer! How did the hackers escape?",
    text: "No idea. They just ransomware.",
  },
  {
    title: "Why can’t data engineers become hat makers?",
    text: "They can only guarantee two thirds of a CAP!",
  },
  {
    title: "How did the hippie learn about database transactions?",
    text: "By taking ACID",
  },
  {
    title: "Why is it called the Dark Ages?",
    text: "There were a lot of KNIGHTS!",
  },
  {
    title:
      "What did the Network Administrator say when they caught a nasty virus?",
    text: "It hurts when IP",
  },
  {
    title: "Which programming language is the shortest?",
    text: "HTML. Because it doesn't have a neck between its <code>head</code> and <code>body</code>.",
  },
  {
    title: "What good can come of 2989 witches casting a hex?",
    text: "None, it is always 0xBAD",
  },
  {
    title:
      "Did you hear about the witch who was off by two when casting a hex?",
    text: "They failed to make the target DEAD and made them DEAF instead!",
  },
  {
    title: "Why do Front-End Developers eat lunch alone?",
    text: "Because, they don't know how to join tables.",
  },
  {
    title:
      "What advice do you give to a JS developer who has never played baseball?",
    text: "Try catch.",
  },
  {
    title: "Why are the arrays that Chuck Norris declare, of infinite size.",
    text: "Because Chuck Norris knows no bounds.",
  },
  {
    title: "Why doesn't Chuck Norris need garbage collection.",
    text: "Because he doesn’t call <code>.Dispose()</code>, he calls <code>.DropKick()</code>.",
  },
  {
    title: "How did the programmer die in the shower?",
    text: "He read the shampoo bottle instructions: Lather. Rinse. Repeat.",
  },
  {
    title: "What did the Java code say to the C code?",
    text: "You've got no class.",
  },
  {
    title: "What is the most used language in programming?",
    text: "Profanity.",
  },
  {
    title:
      "Why did the geek add <code>body { padding-top: 1000px; }</code> to his Facebook profile?",
    text: "He wanted to keep a low profile.",
  },
  {
    title: "Why did the developer quit his job?",
    text: "He did not get arrays.",
  },
  {
    title: "Why couldn't the developer pull the weeds from the garden?",
    text: "They didn't have root access.",
  },
  {
    title: "How do you tell HTML from HTML5?",
    text: "Try it out in Internet Explorer, if it does not work then it's HTML5.",
  },
  {
    title: "What do computers and air conditioners have in common?",
    text: "They both become useless when you open windows.",
  },
  {
    title: "Hamlet: To be - or not to be...",
    text: "Programmer: True !",
  },
  {
    title: "What do cats and programmers have in common?",
    text: 'When either one is unusually happy and excited, an appropriate question would be, "did you find a bug".',
  },
  {
    title: "Why was the developer unable to find his room?",
    text: "His room card said 404",
  },
  {
    title:
      "How do you tell an introverted computer scientist from an extroverted scientist?",
    text: "An extroverted computer scientist looks at your shoes when he talks to you.",
  },
  {
    title: "How do you comfort a JS bug?",
    text: "You console it",
  },
  {
    title: "What's 0.1+0.2?",
    text: "It's 0.30000000000000004",
  },
  {
    title: "Why do programmers prefer dark mode?",
    text: "Because light attracts bugs.",
  },
  {
    title: "Did you know?",
    text: "Spiders are the only web developers in the world that like finding bugs",
  },
  {
    title:
      "Don't add a programming language to your skills list after watching a 15-minute video on it.",
    text: "Yes wait until you've written hello world",
  },

  {
    title: "Why do python developers wear glasses?",
    text: "Because they can't C",
  },
  {
    title: "Why does the Docker container fail?",
    text: "So that, Kubernetes can start it again",
  },
  {
    title: "I.. CAN'T GET.. IT.. OFF!!",
    text: "DUDE, THAT'S BECAUSE YOUR CAPS LOCK IS ON",
  },
  {
    title: "What do NASA programmers do on the weekends?",
    text: "They hit the space bar",
  },
  {
    title: "What do you call a programmer from Finland?",
    text: "Nerdic",
  },
  {
    title: "Want to know the biggest lie in the universe?",
    text: "I have read and agree to the Terms & Conditions",
  },
  {
    title: "What is the biggest lie you have heard from a programmer?",
    text: "It should work now.",
  },
  {
    title: "Why did the functional programmer get thrown out of school?",
    text: "Because he refused to take classes",
  },
];

export default jokes;
