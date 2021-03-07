import './style.css'
const tweetSplitter = require('twitter-splitter')

const inputTxt : HTMLTextAreaElement = document.querySelector('#inputText')
const outputTxt : HTMLDivElement = document.querySelector('#output')
const generate : HTMLDivElement = document.querySelector('#generate')
const date : HTMLSpanElement = document.querySelector('#date')

date.innerText = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year:  'numeric'}).format(new Date())

const text = `Webtwo ipsum bitly convore scribd hipmunk, elgg. Ebay empressr blekko prezi, etsy quora. Plugg groupon bitly wakoopa tumblr zanga, wesabe doostang blekko. lijit. Heekya orkut odeo zillow reddit rovio, imeem rovio koofers plugg, empressr squidoo kippt omgpop. Jaiku napster hulu waze skype orkut, bubbli yuntaa babblely plugg blyve, greplin twones plickers gooru. Chumby jajah kazaa yoono odeo koofers woopra balihoo, eskobo blekko napster imvu sococo octopart. Loopt zooomr joukuu revver dropio mog, lanyrd heroku orkut. Jumo revver klout zillow, insala.

Waze zinch geni yoono wikia, plickers xobni omgpop. Imeem zillow twitter, disqus. Unigo cotweet cloudera jumo imvu divvyshot, eskobo divvyshot appjet skype. Jabber flickr blekko gooru cuil jabber revver, elgg plickers spotify vimeo disqus odeo, zlio heekya oooj meebo rovio. Kno kosmix zillow flickr mzinga prezi jaiku, gooru whrrl kazaa reddit. Qeyno zlio zynga balihoo blippy qeyno, joyent meevee wakoopa oooooc.

Sococo wufoo oooj kosmix vuvox jaiku, imeem cloudera zooomr. twitter wufoo wikia. Plickers kno mobly rovio tumblr odeo, meevee wakoopa appjet. Zoosk wufoo voxy convore, cuil. Kosmix sifteo glogster eskobo hipmunk imeem shopify, meevee bitly squidoo mobly. Bubbli trulia jibjab plaxo balihoo, zynga wikia loopt. jumo cotweet disqus. Kaboodle divvyshot omgpop unigo, fleck geni. Mobly zoho zillow, zoodles. Dogster vuvox plugg weebly, shopify jabber airbnb, imeem orkut.
`

generate.addEventListener('click', function() {
  outputTxt.textContent = ''
  console.log('value: ', inputTxt.value.split("\n"))
  const input = inputTxt.value.split("\n")
  let tweets = ''
  
  const filtered = input.filter((item) => {
    console.log('item: ', item)
    return item.length > 0 
  })
  console.log("🚀 ~ file: main.ts ~ line 21 ~ filtered ~ filtered", filtered)

  const split = filtered.map((string) => tweetSplitter(string, 276, ''))

  const flat = ([]).concat(...split)

  console.log('flat: ', flat)

  flat.forEach((string, index) => {
    let newStr = ''
    console.log('tweets: ', string)
    newStr += `${index + 1}${'\\'}${flat.length} ${string} \n\n`
    tweets += newStr
  })

  const txt = document.createTextNode(tweets)
  
  outputTxt.appendChild(txt)
  
})

inputTxt.value = text

generate.click()