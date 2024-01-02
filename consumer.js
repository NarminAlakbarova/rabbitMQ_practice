const amqp = require("amqplib");
const queueName = process.argv[2] || "jobsQueue";
const data = require("./data.json");
connectRabbitMq();
async function connectRabbitMq() {
  try {
    const conection = await amqp.connect("amqp://localhost:5672");
    const channel = await conection.createChannel();

    const assertion = await channel.assertQueue(queueName);

    //get message
    console.log("Message await");
    channel.consume(queueName, (message) => {
      const messegeInfo = JSON.parse(message.content.toString());
      const userInfo = data.find((item) => item.id == messegeInfo.description);
      if (userInfo) {
        console.log("processed record", userInfo);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
