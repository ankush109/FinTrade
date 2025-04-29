//This is the Auth token, you will use it to generate a meeting and connect to i
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  console.log(token, "token");
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  console.log(roomId, "roomId");
  return roomId;
};
