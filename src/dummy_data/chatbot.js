const ID_CHAT_RETURN_ROOT = -1;
const ID_CHAT_ROOT = 0;

const ID_CHAT_GUIDE = 1;
const ID_GUIDE_CONTACT = 3;
const ID_GUIDE_SELL_PRODUCT = 4;

const ID_CHAT_FORM = 2;

export const guideContact = {
  id: ID_GUIDE_CONTACT,
  type: "OPTION",
  textHelp: `Bước để tạo contact:
    - Bước 1: Truy cập vào link Contact trên Header
    - Bước 2: Nhập biểu mẫu liên lạc đầy đủ thông tin để Admin dễ tìm hơn
    - Bước 3: Nhấn nút gửi
    `,
  option: [
    {
      textOption: "Tôi đã hiểu rồi",
    },
  ],
};
export const guideSellProduct = {
  id: ID_GUIDE_SELL_PRODUCT,
  type: "OPTION",
  textHelp: `Để bán sản phẩm, bạn truy cập vào contact để mở shop. Nếu admin đồng ý mở shop, sẽ tạo riêng 1 tab cửa hàng để bán. Tiếp theo, tạo mới cửa hàng, cung cấp đầy đủ thông tin như địa chỉ, ảnh,...
Cuối cùng, tạo sản phẩm mới cho cửa hàng vừa nhấn`,
  option: [
    {
      textOption: "Tôi đã hiểu rồi",
    },
  ],
};

export const dataChatBotGuide = {
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

export const dataChatBotRoot = {
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
