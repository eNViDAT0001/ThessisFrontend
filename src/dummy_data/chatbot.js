const ID_CHAT_RETURN_ROOT = -1;
const ID_CHAT_ROOT = 0;

const ID_CHAT_GUIDE = 1;
const ID_GUIDE_CONTACT = 3;
const ID_GUIDE_SELL_PRODUCT = 4;

const ID_CHAT_FORM = 2;



const guideContact = {
  id: ID_GUIDE_CONTACT,
};
const guideSellProduct = {
  id: ID_GUIDE_SELL_PRODUCT,
};

const dataChatBotGuide = {
  id: ID_CHAT_GUIDE,
  type: "OPTION",
  textHelp: "Bạn muốn tìm hiểu gì ở trang web ạ",
  option: [
    {
      textOption: "Về Contact",
      data: guideContact,
    },
    { textOption: "Về bán sản phẩm", data: guideSellProduct },
  ],
};

const dataChatBotForm = {
  id: ID_CHAT_FORM,
};

const dataChatBotRoot = {
  id: ID_CHAT_ROOT,
  type: "OPTION",
  textHelp: "Chào bạn, bạn muốn sử dụng dịch vụ gì của trang web",
  option: [
    {
      textOption: "Tìm hiểu hơn về trang web",
      data: dataChatBotGuide,
    },
    {
      textOption: "Sử dụng dịch vụ của trang web",
      data: dataChatBotForm,
    },
  ],
};

const makeReturnRoot = {
  id: ID_CHAT_RETURN_ROOT,
};
