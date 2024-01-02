const amqp = require("amqplib");

const message = {
  description: "test message",
};


connectRabbitMq()
async function connectRabbitMq() {
  try {
    const conection = await amqp.connect("amqp://localhost:5672");
    const channel = await conection.createChannel();
    const assertion = await channel.assertQueue("jobsQueue");
setInterval(()=>{
  message.description=new Date().getTime()
  channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));
  console.log("message: ",message);

},1000)
  } catch (error) {
    console.log(error);
  }
}
