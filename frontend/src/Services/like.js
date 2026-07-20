const user = JSON.parse(localStorage.getItem("user"));
export const LikePost = async (likes, post_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/like/${post_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: post_id, likes: likes }),
    },
  );
};

export const postLike = async (post_id, state) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/likes`, {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ "post_id": post_id, "user_id": user.user_id, "state": state }),
  });
  return response.json();
};

export const getLike = async (post_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/like/${post_id}/${user.user_id}`
  );
  return await response.json()
};
