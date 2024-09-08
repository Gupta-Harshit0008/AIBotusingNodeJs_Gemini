const { GoogleGenerativeAI } = require("@google/generative-ai");
const expess=require('express');
const morgon=require('morgan')
const {Telegraf}=require('telegraf')
const dotenv=require('dotenv');
const { message } = require("telegraf/filters");

dotenv.config({path:'./config.env'})
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const bot= new Telegraf(process.env.TELEGRAM_BOT_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


const app=expess();
app.use(expess.json());
app.use(morgon('dev'))

const run= async(prompt)=> {
const result = await model.generateContent([prompt]);
return result.response.text()
}
// run();

bot.start( async (ctx)=>{
    // console.log(ctx)
    console.log(ctx.message.from)
    console.log(ctx.message.chat)
    await ctx.reply('Hii welcome to my Bot. Please enter your question will try to answer it')
})

bot.on(message('text'), async(ctx)=>{
    try{
        const promt=ctx.message.text
        console.log(promt)
        const result=await run(promt)
     
        ctx.reply(result)
        console.log(result)
    }
    catch{
        ctx.reply('Facing some difficulties pls try again later')
    }
    
})

bot.launch();


app.get('/',(req,res)=>{
    res.send('Hiii ')
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))  

app.listen(4000,()=>{
    console.log('Server is started at port 4000...')
})