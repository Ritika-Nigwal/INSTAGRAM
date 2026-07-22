export const followUser = async (user_id, followed_id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      follow: true,
      follower_id: user_id,
      user_id: followed_id,
    }),
  });
  return response;
};

export const fetchFollower = async (user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/follower/${user_id}`,
  );
  return response;
};

export const fetchFollowing = async (user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/following/${user_id}`,
  );
  return  response;
};
