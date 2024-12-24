// Файл: seedBus.js
const Buses = require("../models/buses"); // Путь к модели Buses

class SeedBuses {
  async seed() {
    const buses = [
      {
        BusNumber: "A123BC",
        NameCompany: "Company A",
        Model: "Model X",
        Capacity: 50,
      },
      {
        BusNumber: "B456DE",
        NameCompany: "Company B",
        Model: "Model Y",
        Capacity: 40,
      },
      {
        BusNumber: "C789FG",
        NameCompany: "Company C",
        Model: "Model Z",
        Capacity: 30,
      },
      {
        BusNumber: "D012HI",
        NameCompany: "Company D",
        Model: "Model W",
        Capacity: 54,
      },
      {
        BusNumber: "E345JK",
        NameCompany: "Company E",
        Model: "Model V",
        Capacity: 18,
      },
      {
        BusNumber: "F678LM",
        NameCompany: "Company F",
        Model: "Model U",
        Capacity: 45,
      },
      {
        BusNumber: "G901MN",
        NameCompany: "Company G",
        Model: "Model T",
        Capacity: 60,
      },
      {
        BusNumber: "H234OP",
        NameCompany: "Company H",
        Model: "Model S",
        Capacity: 35,
      },
      {
        BusNumber: "I567QR",
        NameCompany: "Company I",
        Model: "Model R",
        Capacity: 55,
      },
      {
        BusNumber: "J890ST",
        NameCompany: "Company J",
        Model: "Model Q",
        Capacity: 20,
      },
      {
        BusNumber: "K123UV",
        NameCompany: "Company K",
        Model: "Model P",
        Capacity: 48,
      },
      {
        BusNumber: "L456WX",
        NameCompany: "Company L",
        Model: "Model O",
        Capacity: 33,
      },
      {
        BusNumber: "M789YZ",
        NameCompany: "Company M",
        Model: "Model N",
        Capacity: 25,
      },
      {
        BusNumber: "N012AB",
        NameCompany: "Company N",
        Model: "Model M",
        Capacity: 38,
      },
      {
        BusNumber: "O345CD",
        NameCompany: "Company O",
        Model: "Model L",
        Capacity: 42,
      },
      {
        BusNumber: "P678EF",
        NameCompany: "Company P",
        Model: "Model K",
        Capacity: 29,
      },
      {
        BusNumber: "Q901GH",
        NameCompany: "Company Q",
        Model: "Model J",
        Capacity: 32,
      },
      {
        BusNumber: "R234IJ",
        NameCompany: "Company R",
        Model: "Model I",
        Capacity: 37,
      },
      {
        BusNumber: "S567JK",
        NameCompany: "Company S",
        Model: "Model H",
        Capacity: 28,
      },
      {
        BusNumber: "T890LM",
        NameCompany: "Company T",
        Model: "Model G",
        Capacity: 36,
      },
      {
        BusNumber: "U123NO",
        NameCompany: "Company U",
        Model: "Model F",
        Capacity: 41,
      },
    ];

    try {
      const existingBuses = await Buses.findAll();

      if (existingBuses.length === 0) {
        await Buses.bulkCreate(buses);
        console.log("База данных успешно заполнена.");
      } else {
        console.log(
          "База данных уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных:", error);
    }
  }
}

module.exports = SeedBuses; // Убедитесь, что вы экспортируете класс правильно
