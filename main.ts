import './style.css'
import tweetSplitter from 'twitter-splitter'

const inputTxt : HTMLTextAreaElement = document.querySelector('#inputText')
const outputTxt : HTMLDivElement = document.querySelector('#output')
const generate : HTMLDivElement = document.querySelector('#generate')
const date : HTMLSpanElement = document.querySelector('#date')

const today = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year:  'numeric'}).format(new Date())

date.innerText = today

const text = `# Blogging with Twitter 🐦
1️⃣What Were Our Strengths?
I’ve seen it a lot! Doing a proper retrospective is not all about discovering the negative things — or rather what can be improved.

Let’s focus a part of the retrospective on the things we did well!
That will make sure everyone feels empowered right away.
If you throw this question to your team, you will find that everyone has a different view of what went well.

2️⃣ What Were Our Biggest Obstacles?
It’s also good to talk about the sprint’s obstacles.
In this case, I don’t mean what we did wrong as a team! I mean, what happened that the team didn’t know before? You know, unexpected things.

Sometimes, production issues pop up out of nowhere.
My team and I experienced that last week! It was a disaster, but it was only because the users started using new features we just introduced.

So the lesson was to prepare some time to stay on standby if new features go into production.
But sometimes, the obstacles come from outside the team. It’s important to talk about that with each other.

3️⃣How Can We Improve Our Code Quality?
For most developers, code quality is a serious thing.
But instead of checking what kind of ugly code we have in our applications, we should think about how we can improve the code.

Yes, you probably have tools and systems in place.
But I know for sure you and your team can come up with some very simple improvements — things that don’t cost a lot of time.

That’s why I think it’s a good idea to spend some time during one of your retrospective meetings on code quality. We all want to write readable code in our applications.

4️⃣Who Helped You During This Sprint?
Let’s spend some time on the human part of the development team. We are developers (sorry if you’re not, but you’re probably working with some) who focus on the technical aspect of our job.

Being a developer in a team is so much more than only the technical part. We have to collaborate and communicate with each other.

Spending time to offer some appreciation to one of your team members can be useful for team bonding. Just say that it felt incredible when a teammate helped you out with a difficult task.

Everyone needs a compliment — no matter how good you are as a developer. It will brighten someone’s day!

5️⃣How Can We Improve Our Retrospectives?
I think retrospectives are vital for a development team. And it is just as important for a team to determine how they can improve their retrospectives.

There are many approaches available on the web:
- The Good, Bad & Ugly
- Liked — Learned — Lacked — Longed For
- One-Word Exercise
- KALM

I like one where the Scrum leader selects a few questions to bring to the team to discuss. Document this. It’s always good to look back at what you have discussed with the team.

6️⃣Conclusion
I hope this article will help you and your team have better retrospectives. When a retrospective has the right ingredients and the proper discussions, we grow as a team.

👉Read my post here: https://betterprogramming.pub/5-development-retrospective-questions-to-have-great-discussions-aa77f96cf793
`

generate.addEventListener('click', function() {
  outputTxt.textContent = ''
  console.log('value: ', inputTxt.value.split("\n\n"))
  const input = inputTxt.value.split("\n\n")
  let tweets = ''
  
  const filtered = input.filter((item) => {
    console.log('item: ', item)
    return item.length > 0 
  })

  const split = filtered.map((string) => tweetSplitter(string, 276, ''))

  const flat = ([]).concat(...split)

  console.log('flat: ', flat)

  flat.forEach((string, index) => createTweetElement(flat, string, index))
})

function createTweetElement(arr, string, index) {
  const tweetEl = document.createElement('div')
  tweetEl.className = 'tweet'

  const copyTweetBtn = document.createElement('button')
  copyTweetBtn.innerHTML = 'copy'

  const twitterFooter = document.createElement('footer')
  twitterFooter.className = 'tweet__footer'

  const tweetContentEl = document.createElement('div')
  const tweetContentP = document.createElement('p')
  tweetContentEl.className = 'tweet__content'

  const tweetProfile = document.createElement('div')
  tweetProfile.className = 'tweet__profile'
  tweetProfile.style.backgroundImage = 'url("https://pbs.twimg.com/profile_images/1366726728345915392/hzK0Vj4Z_400x400.jpg")'
  
  console.log('string.startsWith: ', string.startsWith('#'))
  const firstTweet = string.startsWith('#')
  const tweetNumber = !firstTweet ? `${index + 1}${'\\'}${arr.length}` : ''

  const newStr = (!firstTweet ? tweetNumber + ' ' : '')  + (firstTweet ? string.replace('#', '').trim() : string)
  const tweetTxt = document.createTextNode(newStr)

  copyTweetBtn.addEventListener('click', function(){
    copyTweet(tweetContentEl, twitterFooter)
  })

  tweetContentP.appendChild(tweetTxt)
  tweetContentEl.appendChild(tweetContentP)
  tweetContentEl.appendChild(copyTweetBtn)
  tweetContentEl.appendChild(twitterFooter)
  
  tweetEl.appendChild(tweetProfile)
  tweetEl.appendChild(tweetContentEl)
  outputTxt.appendChild(tweetEl)
}

function copyTweet(copyText, messageEl) {
  console.dir(copyText)
  const range = document.createRange();

  range.selectNode(copyText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  
  messageEl.innerHTML = `Tweet is copied`
  setTimeout(() => {
    messageEl.innerHTML = ""
  }, 1000)
}

inputTxt.value = text

generate.click()