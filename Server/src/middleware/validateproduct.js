function validateProduct(req, res, next) {
  const { title, category, price, rating, brand, reviews } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  if (!category) {
    return res.status(400).json({ message: "category is required" });
  }
  if (!price) {
    return res.status(400).json({ message: "price is required" });
  }
  if (!rating) {
    return res.status(400).json({ message: "rating is required" });
  }
  if (!brand) {
    return res.status(400).json({ message: "brand is required" });
  }
  if (!reviews) {
    return res.status(400).json({ message: "reviews is required" });
  }
  next();
}
export default validateProduct;
