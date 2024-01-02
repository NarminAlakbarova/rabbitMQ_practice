const amqp = require("amqplib");

const message = {
  description: "test message",
};
const data = require("./data.json");
const queueName = process.argv[2] || "jobsQueue";

connectRabbitMq();
async function connectRabbitMq() {
  try {
    const conection = await amqp.connect("amqp://localhost:5672");
    const channel = await conection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    data.forEach((item) => {
      message.description = item.id;
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("message: ", message);
    });

    // with intervall
    // setInterval(() => {
    //   message.description = new Date().getTime();
    //   channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    //   console.log("message: ", message);
    // }, 1000);
    
  } catch (error) {
    console.log(error);
  }
}
