module.exports = {
  attributes: {
    identifier: {
      type: 'string',
      required: true,
      unique: true,

      __caption__: "ID",
      __description__: "A unique identifier that identifies this station"
    },

    name: {
      type: 'string',
      required: true,

      __caption__: "Name",
      __description__: "A human readable name for the station"
    },

    longitude: {
      type: 'float',

      __caption__: "Longitude",
      __suffix__: "°E"
    },

    latitude: {
      type: 'float',

      __caption__: "Latitude",
      __suffix__: "°N"
    },

    elevation: {
      type: 'float',

      __caption__: "Elevation",
      __suffix__: "m"
    },

    description: {
      type: 'string',

      __caption__: "Description"
    },

    established: {
      type: 'date',

      __caption__: "Established"
    }
  }
}
