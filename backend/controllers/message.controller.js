export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    const senderId = "";
  } catch (error) {
    console.log("Error in message controller", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
