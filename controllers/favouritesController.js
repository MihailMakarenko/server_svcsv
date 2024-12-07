// controllers/favouritesController.js
const FavouritesService = require("../services/favouritesService");

class FavouritesController {
  // Получить все избранные записи
  async getAllFavourites(req, res) {
    try {
      const favourites = await FavouritesService.getAllFavourites();
      res.status(200).json(favourites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получить избранное по FavouriteId
  async getFavouriteById(req, res) {
    const { FavouriteId } = req.params;
    try {
      const favourite = await FavouritesService.getFavouriteById(FavouriteId);
      if (!favourite) {
        return res.status(404).json({ message: "Избранное не найдено" });
      }
      res.status(200).json(favourite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Создать новое избранное
  async createFavourite(req, res) {
    const { UserId, TripId } = req.body;

    try {
      const favourite = await FavouritesService.createFavourite({
        UserId,
        TripId,
      });
      res.status(201).json(favourite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить избранное
  async deleteFavourite(req, res) {
    const { FavouriteId } = req.params;

    try {
      await FavouritesService.deleteFavourite(FavouriteId);
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res
        .status(error.message === "Избранное не найдено" ? 404 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new FavouritesController();
