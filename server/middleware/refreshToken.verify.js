const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ msg: "Refresh token missing" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );

    const user = await User.findById(decoded.userID);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // create new access token
    const newAccessToken = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.json({ token: newAccessToken });

  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
};


module.exports=refreshAccessToken