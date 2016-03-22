jest.unmock('../RTDLParser');
jest.unmock('fs');
jest.unmock('path');
jest.unmock('aes-js');

const dataOrigins = {
  9701: {
    options: {
      security: 4253717,
      aes: "7274556231249731",
      //aes: "9752325135323618"
    }
  }
};

const dataSource = {
  getDataOrigin: function(code) {
    expect(code).toEqual(9701);
    return dataOrigins[code];
  }
}

describe('RTDLParser', () => {
  it('processes sample binary rtdl data', () => {
    const fs = require('fs');
    const path = require('path');
    const RTDLParser = require('../RTDLParser');

    const buffer = fs.readFileSync(path.resolve(__dirname, "./raw-9701-normal.bin"));
    const expectedDevice = 9701;

    RTDLParser((res) => {
      expect(res.data.length).toEqual(21);
    }, buffer, dataSource);
  });
})
