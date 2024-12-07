// services/favouritesService.js
const Favourites = require("../models/favourites");
const User = require("../models/user");
const Trip = require("../models/trips");

class FavouritesService {
  async getAllFavourites() {
    return await Favourites.findAll();
  }

  async getFavouriteById(FavouriteId) {
    return await Favourites.findByPk(FavouriteId);
  }

  async createFavourite(favouriteData) {
    const userExists = await User.findByPk(favouriteData.UserId);
    const tripExists = await Trip.findByPk(favouriteData.TripId);

    if (!userExists) {
      throw new Error("Пользователь не найден");
    }
    if (!tripExists) {
      throw new Error("Поездка не найдена");
    }

    return await Favourites.create(favouriteData);
  }

  async deleteFavourite(FavouriteId) {
    const favourite = await this.getFavouriteById(FavouriteId);
    if (!favourite) {
      throw new Error("Избранное не найдено");
    }
    await favourite.destroy();
  }
}

module.exports = new FavouritesService();
