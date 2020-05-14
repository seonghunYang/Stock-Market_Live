
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const TITLE = ["사이드 메뉴를 펄치세요!", "원하는 화사를 검색하세요!", "보고싶은 회사를 클릭하세요!",
    "회사 정보를 확인하세요!", "주식 정보를 확인하세요!", "주식 차트를 확인하세요!",
    "wishlist에 등록하세요!", "wishlist를 확인하세요!", "wishlist를 활용하세요!"
];
const CONTENT=["페이지 좌측 상단에 메뉴 아이콘을 클릭하여 사이드 메뉴를 펄쳐보실 수 있습니다. 사이드 메뉴에는 화시 리스트를 확인할 수 있는 companyList와 wishlist를 확인할 수 있고 뉴스 페이지로 갈 수 있습니다.",
  "companyList를 클릭하여 생기는 검색바를 통해 회사 symbol로 원하는 회사를 검색하세요",
  "원하는 회사를 검색하셨다면, 더 많은 회사 정보와 주식 정보를 확인하기 위해 클릭하세요! 상세 페이지로 이동합니다",
  "회사 상세페이지 최상단에는 회사 symbol와 이름이 표시됩니다. 그리고 그 아래에는 회사의 분야와 시가 총액을 확인하실 수 있습니다!",
  "주식 정보는 회사 정보 아래에서 주식의 전반적인 상태를 확인하실 수 있습니다. 주식의 다양한 시점에서 가격과 전문가들이 예상한 주식 가격까지 확인하실 수 있습니다. 또한 최상단에는 실시간으로 변경하는 주식 가격을 확인하실 수 있습니다!",
  "회사 정보 아래에는 주식 차트를 확인할 수 있습니다. 차트는 Candle chart와 Area chart가 존재하고 시점에따라 5, 15, D, M 만큼 간격을 두고 그래프를 확인하실 수 있습니다!",
  "회사 상세페이지 우측 상단에 별을 클릭하시면 wishlist에 등록하실 수 있습니다. 등록에 성공하면 팝업 알림이 알려드립니다!",
  "wishlist에 등록이 성공되었다면 사이드 메뉴에 wishlist에서 등록한 회사를 확인하실 수 있습니다! 이를 통해 더 빠르게 관심있는 화시에 접근하실 수 있습니다!",
  "wishlist에 등록한 회사 뉴스는 뉴스페이지에서 더 빠르게 접근하여 뉴스 정보를 확인하실 수 있습니다!"
];

export default function Tutorial_content(idx) {
  return {
    idx: idx,
    numbering: NUMBER[idx],
    title: TITLE[idx],
    content: CONTENT[idx]
  }
}