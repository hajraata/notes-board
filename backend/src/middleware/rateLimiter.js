import ratelimit from "../config/upstash.js";

// the rate limit is applied to each user when using authentication
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit"); // replace "my-rate-limit" with a user's id to monitor each user's rate limit separately

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requets. Try again later!" });
    }

    next();
  } catch (error) {
    console.error("Rate limit error.", error);
    next(error);
  }
};

export default rateLimiter;
