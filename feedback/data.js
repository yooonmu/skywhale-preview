// node tools/feedback_page.mjs 가 만든다 — 직접 고치지 말고 status.json을 고친다
window.FB70 = {
 "built": "2026-11-10T20:57:48.115Z",
 "updated": {
  "before": "2026-11-11T05:20:19",
  "after": "2026-11-11T05:51:45"
 },
 "items": [
  {
   "n": 1,
   "title": "타이틀 · 로딩 화면",
   "area": "타이틀",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "목업 A(붓 자국 로고) + 부제 「하늘을 물들이는 소녀들」 적용: 가로 무지개 붓 자국 위 「레인보우」(작은 기울임)·「아틀리에」(큰 글씨), 덜 귀여운 노을 하늘·구름 바다, 고래 자연스러운 흔들림, 빛가루·셰이더, 붓으로 칠하는 로딩 줄, 손글씨 시작 안내 + 무지개 밑줄. 네 아이는 그림 속 머리 높이(정수리~턱)를 재서 머리 크기 104px로 맞추되, 몸이 긴 시엘만 머리 맞춤과 키 맞춤의 중간(94px)으로 두고 갑판 조금 뒤쪽에 세워 미오 방패·카렌 머리카락과 덜 겹치게 함. 앱 이름 「레인보우 아틀리에」(설정·크레딧·부트 스플래시 포함). 비교: artifacts/feedback70/after/title_compare (목업 A ↔ 게임, 로딩→시작 프레임 띠, 네 아이 처음 → 머리 맞춤 → 지금 3단 비교)",
   "novisual": "",
   "caps": [
    {
     "id": "title_loading",
     "res": "1280x720",
     "label": "타이틀 · 로딩 막대",
     "before": [
      "img/before/title_loading_f1_1280x720.jpg",
      "img/before/title_loading_f2_1280x720.jpg",
      "img/before/title_loading_f3_1280x720.jpg",
      "img/before/title_loading_f4_1280x720.jpg",
      "img/before/title_loading_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/title_loading_f1_1280x720.jpg",
      "img/after/title_loading_f2_1280x720.jpg",
      "img/after/title_loading_f3_1280x720.jpg",
      "img/after/title_loading_f4_1280x720.jpg",
      "img/after/title_loading_f5_1280x720.jpg"
     ]
    },
    {
     "id": "title_loading",
     "res": "1600x720",
     "label": "타이틀 · 로딩 막대",
     "before": [
      "img/before/title_loading_f1_1600x720.jpg",
      "img/before/title_loading_f2_1600x720.jpg",
      "img/before/title_loading_f3_1600x720.jpg",
      "img/before/title_loading_f4_1600x720.jpg"
     ],
     "after": [
      "img/after/title_loading_f1_1600x720.jpg",
      "img/after/title_loading_f2_1600x720.jpg",
      "img/after/title_loading_f3_1600x720.jpg",
      "img/after/title_loading_f4_1600x720.jpg"
     ]
    },
    {
     "id": "title_ready",
     "res": "1280x720",
     "label": "타이틀 · 터치해서 시작",
     "before": [
      "img/before/title_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/title_ready_1280x720.jpg"
     ]
    },
    {
     "id": "title_ready",
     "res": "1600x720",
     "label": "타이틀 · 터치해서 시작",
     "before": [
      "img/before/title_ready_1600x720.jpg"
     ],
     "after": [
      "img/after/title_ready_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 2,
   "title": "터치 끌기 빛가루가 화면 위쪽에서 잘림",
   "area": "연출",
   "status": "완료",
   "owner": "skywhale-effect",
   "note": "원인: 아래 방향·사각 방출이라 가루 윗변이 끈 줄을 따라 평평했음 → 원형 방출·사방 출발·감속으로 위아래 모두 옅어지는 구름 + 별빛 한 겹 (확대 비교: artifacts/feedback70/after/touch_zoom)",
   "novisual": "",
   "caps": [
    {
     "id": "touch_drag_mid",
     "res": "1280x720",
     "label": "화면 가운데에서 끌 때 빛가루 (비교)",
     "before": [
      "img/before/touch_drag_mid_f1_1280x720.jpg",
      "img/before/touch_drag_mid_f2_1280x720.jpg",
      "img/before/touch_drag_mid_f3_1280x720.jpg",
      "img/before/touch_drag_mid_f4_1280x720.jpg",
      "img/before/touch_drag_mid_f5_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "touch_drag_top",
     "res": "1280x720",
     "label": "화면 위쪽에서 끌 때 빛가루",
     "before": [
      "img/before/touch_drag_top_f1_1280x720.jpg",
      "img/before/touch_drag_top_f2_1280x720.jpg",
      "img/before/touch_drag_top_f3_1280x720.jpg",
      "img/before/touch_drag_top_f4_1280x720.jpg",
      "img/before/touch_drag_top_f5_1280x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 3,
   "title": "게임 안 UI들이 서로 너무 비슷함",
   "area": "UI 공통",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adventure_hub",
     "res": "1280x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1600x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1280x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1280x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1600x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 4,
   "title": "전투 중 스테이지 UI 중복",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech · skywhale-ui",
   "note": "보스 칸에서 「STAGE n」 띠가 보스 등장 두루마리와 겹치던 것 → 두루마리가 뜰 때 띠를 걷음(tech). 시안 B(ui): 가운데 STAGE 판 · 보스 판 BOSS 꼬리표를 없애고 스테이지 번호는 왼쪽 위 통합 판의 기운 배지 한 곳에만. 아랫줄은 번호 대신 「1장 · 벚꽃 군도 · 보스까지 7칸」(stage_structure_check 기대값 갱신). 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "boss_intro",
     "res": "1280x720",
     "label": "보스 등장 · 위쪽 스테이지/보스 UI",
     "before": [
      "img/before/boss_intro_f1_1280x720.jpg",
      "img/before/boss_intro_f2_1280x720.jpg",
      "img/before/boss_intro_f3_1280x720.jpg",
      "img/before/boss_intro_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/boss_intro_f1_1280x720.jpg",
      "img/after/boss_intro_f2_1280x720.jpg",
      "img/after/boss_intro_f3_1280x720.jpg",
      "img/after/boss_intro_f4_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1280x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1600x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "stage_clear_transition",
     "res": "1280x720",
     "label": "스테이지 정화(CLEAR) → 항해 → 다음 STAGE 띠",
     "before": [
      "img/before/stage_clear_transition_f1_1280x720.jpg",
      "img/before/stage_clear_transition_f2_1280x720.jpg",
      "img/before/stage_clear_transition_f3_1280x720.jpg",
      "img/before/stage_clear_transition_f4_1280x720.jpg",
      "img/before/stage_clear_transition_f5_1280x720.jpg",
      "img/before/stage_clear_transition_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/stage_clear_transition_f1_1280x720.jpg",
      "img/after/stage_clear_transition_f2_1280x720.jpg",
      "img/after/stage_clear_transition_f3_1280x720.jpg",
      "img/after/stage_clear_transition_f4_1280x720.jpg",
      "img/after/stage_clear_transition_f5_1280x720.jpg",
      "img/after/stage_clear_transition_f6_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 5,
   "title": "고래 숨결 버튼 위치",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "고래 숨결 버튼(fx 에이전트 새 모양 그대로, 248px)을 하단 메뉴 바로 옆 엄지 자리(바닥에서 14px)로. 순풍 가속을 넓게(200px) 위에, 그 아래 복귀 · 자동을 두는 조작 줄로 바꿔 1280에서도 메뉴 바 · 숨결 · 조작 줄 · 스킬칸 4칸이 겹치지 않음 (whale_breath_check 1280/1600 겹침 검사 통과). 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "breath_cast",
     "res": "1280x720",
     "label": "고래 숨결 사용 연출",
     "before": [
      "img/before/breath_cast_f1_1280x720.jpg",
      "img/before/breath_cast_f2_1280x720.jpg",
      "img/before/breath_cast_f3_1280x720.jpg",
      "img/before/breath_cast_f4_1280x720.jpg",
      "img/before/breath_cast_f5_1280x720.jpg",
      "img/before/breath_cast_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_cast_f1_1280x720.jpg",
      "img/after/breath_cast_f2_1280x720.jpg",
      "img/after/breath_cast_f3_1280x720.jpg",
      "img/after/breath_cast_f4_1280x720.jpg",
      "img/after/breath_cast_f5_1280x720.jpg",
      "img/after/breath_cast_f6_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1280x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1600x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1600x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "tut_breath",
     "res": "1280x720",
     "label": "안내 · 고래 숨결",
     "before": [
      "img/before/tut_breath_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_breath_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 6,
   "title": "스테이지 전환 UI",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "가운데 크림 띠 대신 시안 B 전환 카드(scripts/hud_stage_card.gd): 살짝 돌아선 크림 카드 + 금테 · 위아래 무지개 줄 · 훑는 빛. 정화 순간 「STAGE 33 · CLEAR」(금빛→분홍 글자) → 다음 스테이지가 시작되면 같은 카드가 뒤집혀 「NEXT STAGE · 34 · 장 · 지역」(라벤더→분홍 큰 숫자)으로 바뀌고 왼쪽으로 빠짐. 별가루 터짐. 보스가 나오면 걷힘. 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "stage_clear_transition",
     "res": "1280x720",
     "label": "스테이지 정화(CLEAR) → 항해 → 다음 STAGE 띠",
     "before": [
      "img/before/stage_clear_transition_f1_1280x720.jpg",
      "img/before/stage_clear_transition_f2_1280x720.jpg",
      "img/before/stage_clear_transition_f3_1280x720.jpg",
      "img/before/stage_clear_transition_f4_1280x720.jpg",
      "img/before/stage_clear_transition_f5_1280x720.jpg",
      "img/before/stage_clear_transition_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/stage_clear_transition_f1_1280x720.jpg",
      "img/after/stage_clear_transition_f2_1280x720.jpg",
      "img/after/stage_clear_transition_f3_1280x720.jpg",
      "img/after/stage_clear_transition_f4_1280x720.jpg",
      "img/after/stage_clear_transition_f5_1280x720.jpg",
      "img/after/stage_clear_transition_f6_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 7,
   "title": "1.5배속 고정 · 배속 버튼 없애기",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "전투는 늘 1.5배(순풍 3배 = 평소의 2배, 화면에는 「2배속」·던전 1.5배), 배속 버튼·저장의 배속 값·조작 안내 「배속」 칸 제거 — 옛 저장의 배속 값은 읽지 않고 다음 저장에서 빠짐. battle_speed_check 11/11 통과",
   "novisual": "",
   "caps": [
    {
     "id": "after_return_climb",
     "res": "1280x720",
     "label": "복귀 뒤 STAGE 1부터 다시 오르기",
     "before": [
      "img/before/after_return_climb_f1_1280x720.jpg",
      "img/before/after_return_climb_f2_1280x720.jpg",
      "img/before/after_return_climb_f3_1280x720.jpg",
      "img/before/after_return_climb_f4_1280x720.jpg",
      "img/before/after_return_climb_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/after_return_climb_f1_1280x720.jpg",
      "img/after/after_return_climb_f2_1280x720.jpg",
      "img/after/after_return_climb_f3_1280x720.jpg",
      "img/after/after_return_climb_f4_1280x720.jpg",
      "img/after/after_return_climb_f5_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "tut_controls_0",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (1)",
     "before": [
      "img/before/tut_controls_0_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_controls_0_1280x720.jpg"
     ]
    },
    {
     "id": "tut_controls_1",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (2)",
     "before": [
      "img/before/tut_controls_1_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_controls_1_1280x720.jpg"
     ]
    },
    {
     "id": "tut_controls_2",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (3)",
     "before": [
      "img/before/tut_controls_2_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "wind_active",
     "res": "1280x720",
     "label": "순풍 가속 사용 (3배속)",
     "before": [
      "img/before/wind_active_f1_1280x720.jpg",
      "img/before/wind_active_f2_1280x720.jpg",
      "img/before/wind_active_f3_1280x720.jpg",
      "img/before/wind_active_f4_1280x720.jpg",
      "img/before/wind_active_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/wind_active_f1_1280x720.jpg",
      "img/after/wind_active_f2_1280x720.jpg",
      "img/after/wind_active_f3_1280x720.jpg",
      "img/after/wind_active_f4_1280x720.jpg",
      "img/after/wind_active_f5_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 8,
   "title": "강화 안내 (오른쪽 아래)",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "강화 퀘스트(#4)에서 손가락 안내가 카드 위 강화 버튼을 짚고 옆에 「1/3」 진행을 띄움 · 끝나면 퀘스트 칸 보상 받기까지 짚음 (가이드퀘스트 확정안)",
   "novisual": "",
   "caps": [
    {
     "id": "guide_upgrade_1",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (1)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_2",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (2)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_3",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (3)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_4",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_upgrade_4_1280x720.jpg"
     ]
    },
    {
     "id": "tut_bulk",
     "res": "1280x720",
     "label": "안내 · 일괄 강화",
     "before": [
      "img/before/tut_bulk_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_bulk_1280x720.jpg"
     ]
    },
    {
     "id": "tut_upgrade",
     "res": "1280x720",
     "label": "안내 · 강화 버튼",
     "before": [
      "img/before/tut_upgrade_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_upgrade_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 9,
   "title": "튜토리얼 강조 상자 모양이 대상과 안 맞음",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "강조 테두리가 노란 상자 대신 가리키는 컨트롤의 실제 모양(사각 모서리 반지름 · 원 · 기울기)을 따라 그림 (tutorial.gd HALO_SHADER, _shape) · 스크롤 밖 버튼은 목록을 끌어와 짚음",
   "novisual": "",
   "caps": [
    {
     "id": "guide_arena_1",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (1)",
     "before": [],
     "after": [
      "img/after/guide_arena_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_2",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (2)",
     "before": [],
     "after": [
      "img/after/guide_arena_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_3",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (3)",
     "before": [],
     "after": [
      "img/after/guide_arena_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_4",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (4)",
     "before": [],
     "after": [
      "img/after/guide_arena_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_5",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_arena_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_1",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (1)",
     "before": [],
     "after": [
      "img/after/guide_build_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_2",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (2)",
     "before": [],
     "after": [
      "img/after/guide_build_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_3",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (3)",
     "before": [],
     "after": [
      "img/after/guide_build_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_4",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_build_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_1",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (1)",
     "before": [],
     "after": [
      "img/after/guide_bulk_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_2",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (2)",
     "before": [],
     "after": [
      "img/after/guide_bulk_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_3",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (3) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_bulk_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_1",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (1)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_2",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (2)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_3",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (3)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_4",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_dungeon_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_1",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (1)",
     "before": [],
     "after": [
      "img/after/guide_element_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_2",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (2)",
     "before": [],
     "after": [
      "img/after/guide_element_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_3",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (3)",
     "before": [],
     "after": [
      "img/after/guide_element_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_1",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (1)",
     "before": [],
     "after": [
      "img/after/guide_equip_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_10",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (10)",
     "before": [],
     "after": [
      "img/after/guide_equip_10_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_11",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (11)",
     "before": [],
     "after": [
      "img/after/guide_equip_11_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_12",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (12)",
     "before": [],
     "after": [
      "img/after/guide_equip_12_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_13",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (13)",
     "before": [],
     "after": [
      "img/after/guide_equip_13_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_14",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (14)",
     "before": [],
     "after": [
      "img/after/guide_equip_14_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_15",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (15)",
     "before": [],
     "after": [
      "img/after/guide_equip_15_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_16",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (16)",
     "before": [],
     "after": [
      "img/after/guide_equip_16_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_17",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (17)",
     "before": [],
     "after": [
      "img/after/guide_equip_17_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_18",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (18)",
     "before": [],
     "after": [
      "img/after/guide_equip_18_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_19",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (19)",
     "before": [],
     "after": [
      "img/after/guide_equip_19_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_2",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (2)",
     "before": [],
     "after": [
      "img/after/guide_equip_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_20",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (20) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_equip_20_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_3",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (3)",
     "before": [],
     "after": [
      "img/after/guide_equip_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_4",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (4)",
     "before": [],
     "after": [
      "img/after/guide_equip_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_5",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (5)",
     "before": [],
     "after": [
      "img/after/guide_equip_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_6",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (6)",
     "before": [],
     "after": [
      "img/after/guide_equip_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_7",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (7)",
     "before": [],
     "after": [
      "img/after/guide_equip_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_8",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (8)",
     "before": [],
     "after": [
      "img/after/guide_equip_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_9",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (9)",
     "before": [],
     "after": [
      "img/after/guide_equip_9_1280x720.jpg"
     ]
    },
    {
     "id": "guide_formation_1",
     "res": "1280x720",
     "label": "손가락 안내 · 편성 (1) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_formation_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_1",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (1)",
     "before": [],
     "after": [
      "img/after/guide_front_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_2",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (2)",
     "before": [],
     "after": [
      "img/after/guide_front_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_3",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (3)",
     "before": [],
     "after": [
      "img/after/guide_front_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_4",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (4)",
     "before": [],
     "after": [
      "img/after/guide_front_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_5",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_front_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_1",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (1)",
     "before": [],
     "after": [
      "img/after/guide_growth_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_2",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (2)",
     "before": [],
     "after": [
      "img/after/guide_growth_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_3",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (3)",
     "before": [],
     "after": [
      "img/after/guide_growth_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_4",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (4)",
     "before": [],
     "after": [
      "img/after/guide_growth_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_5",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (5)",
     "before": [],
     "after": [
      "img/after/guide_growth_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_6",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (6)",
     "before": [],
     "after": [
      "img/after/guide_growth_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_7",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (7)",
     "before": [],
     "after": [
      "img/after/guide_growth_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_8",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_growth_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_1",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (1)",
     "before": [],
     "after": [
      "img/after/guide_recommend_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_2",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (2)",
     "before": [],
     "after": [
      "img/after/guide_recommend_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_3",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (3)",
     "before": [],
     "after": [
      "img/after/guide_recommend_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_4",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_recommend_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_1",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (1)",
     "before": [],
     "after": [
      "img/after/guide_repaint_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_2",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (2)",
     "before": [],
     "after": [
      "img/after/guide_repaint_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_3",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (3)",
     "before": [],
     "after": [
      "img/after/guide_repaint_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_4",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (4)",
     "before": [],
     "after": [
      "img/after/guide_repaint_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_5",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (5)",
     "before": [],
     "after": [
      "img/after/guide_repaint_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_6",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (6)",
     "before": [],
     "after": [
      "img/after/guide_repaint_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_7",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (7)",
     "before": [],
     "after": [
      "img/after/guide_repaint_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_8",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_repaint_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_1",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (1)",
     "before": [],
     "after": [
      "img/after/guide_return_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_2",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (2)",
     "before": [],
     "after": [
      "img/after/guide_return_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_3",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (3) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_return_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_1",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (1)",
     "before": [],
     "after": [
      "img/after/guide_star_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_2",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (2)",
     "before": [],
     "after": [
      "img/after/guide_star_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_3",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (3)",
     "before": [],
     "after": [
      "img/after/guide_star_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_4",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (4)",
     "before": [],
     "after": [
      "img/after/guide_star_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_5",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (5)",
     "before": [],
     "after": [
      "img/after/guide_star_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_6",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (6)",
     "before": [],
     "after": [
      "img/after/guide_star_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_7",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (7)",
     "before": [],
     "after": [
      "img/after/guide_star_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_8",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_star_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_1",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (1)",
     "before": [],
     "after": [
      "img/after/guide_study_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_2",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (2)",
     "before": [],
     "after": [
      "img/after/guide_study_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_3",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (3)",
     "before": [],
     "after": [
      "img/after/guide_study_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_4",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_study_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_1",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (1)",
     "before": [],
     "after": [
      "img/after/guide_summon_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_2",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (2)",
     "before": [],
     "after": [
      "img/after/guide_summon_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_3",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (3)",
     "before": [],
     "after": [
      "img/after/guide_summon_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_4",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_summon_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_1",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (1)",
     "before": [],
     "after": [
      "img/after/guide_temple_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_2",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (2)",
     "before": [],
     "after": [
      "img/after/guide_temple_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_3",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (3)",
     "before": [],
     "after": [
      "img/after/guide_temple_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_1",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (1)",
     "before": [],
     "after": [
      "img/after/guide_tower_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_2",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (2)",
     "before": [],
     "after": [
      "img/after/guide_tower_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_3",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (3)",
     "before": [],
     "after": [
      "img/after/guide_tower_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_1",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (1)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_2",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (2)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_3",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (3)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_4",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_upgrade_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_1",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (1)",
     "before": [],
     "after": [
      "img/after/guide_whale_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_2",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (2)",
     "before": [],
     "after": [
      "img/after/guide_whale_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_3",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (3)",
     "before": [],
     "after": [
      "img/after/guide_whale_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_4",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (4)",
     "before": [],
     "after": [
      "img/after/guide_whale_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_5",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_whale_5_1280x720.jpg"
     ]
    },
    {
     "id": "tut_arena",
     "res": "1280x720",
     "label": "안내 · 등급전",
     "before": [
      "img/before/tut_arena_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_arena_1280x720.jpg"
     ]
    },
    {
     "id": "tut_boss",
     "res": "1280x720",
     "label": "안내 · 보스",
     "before": [
      "img/before/tut_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_boss_1280x720.jpg"
     ]
    },
    {
     "id": "tut_breath",
     "res": "1280x720",
     "label": "안내 · 고래 숨결",
     "before": [
      "img/before/tut_breath_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_breath_1280x720.jpg"
     ]
    },
    {
     "id": "tut_build",
     "res": "1280x720",
     "label": "안내 · 분교 과학실",
     "before": [
      "img/before/tut_build_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_build_1280x720.jpg"
     ]
    },
    {
     "id": "tut_bulk",
     "res": "1280x720",
     "label": "안내 · 일괄 강화",
     "before": [
      "img/before/tut_bulk_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_bulk_1280x720.jpg"
     ]
    },
    {
     "id": "tut_color",
     "res": "1280x720",
     "label": "안내 · 첫 정화 · 색 되찾기",
     "before": [
      "img/before/tut_color_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_color_1280x720.jpg"
     ]
    },
    {
     "id": "tut_color_scene",
     "res": "1280x720",
     "label": "안내 · 첫 정화 장면 (색이 번짐)",
     "before": [
      "img/before/tut_color_scene_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_color_scene_1280x720.jpg"
     ]
    },
    {
     "id": "tut_controls_0",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (1)",
     "before": [
      "img/before/tut_controls_0_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_controls_0_1280x720.jpg"
     ]
    },
    {
     "id": "tut_controls_1",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (2)",
     "before": [
      "img/before/tut_controls_1_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_controls_1_1280x720.jpg"
     ]
    },
    {
     "id": "tut_controls_2",
     "res": "1280x720",
     "label": "안내 · 전투 조작 (3)",
     "before": [
      "img/before/tut_controls_2_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "tut_deck",
     "res": "1280x720",
     "label": "안내 · 갑판 소개",
     "before": [
      "img/before/tut_deck_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_deck_1280x720.jpg"
     ]
    },
    {
     "id": "tut_deck",
     "res": "1600x720",
     "label": "안내 · 갑판 소개",
     "before": [],
     "after": [
      "img/after/tut_deck_1600x720.jpg"
     ]
    },
    {
     "id": "tut_dungeon",
     "res": "1280x720",
     "label": "안내 · 모험 · 회랑",
     "before": [
      "img/before/tut_dungeon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_dungeon_1280x720.jpg"
     ]
    },
    {
     "id": "tut_equip",
     "res": "1280x720",
     "label": "안내 · 장비 끼우기",
     "before": [
      "img/before/tut_equip_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_equip_1280x720.jpg"
     ]
    },
    {
     "id": "tut_formation",
     "res": "1280x720",
     "label": "안내 · 편성",
     "before": [
      "img/before/tut_formation_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_formation_1280x720.jpg"
     ]
    },
    {
     "id": "tut_growth",
     "res": "1280x720",
     "label": "안내 · 성장 (진주)",
     "before": [
      "img/before/tut_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_growth_1280x720.jpg"
     ]
    },
    {
     "id": "tut_info",
     "res": "1280x720",
     "label": "안내 · 아이 정보",
     "before": [
      "img/before/tut_info_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_info_1280x720.jpg"
     ]
    },
    {
     "id": "tut_quest",
     "res": "1280x720",
     "label": "안내 · 퀘스트 받기",
     "before": [
      "img/before/tut_quest_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_quest_1280x720.jpg"
     ]
    },
    {
     "id": "tut_repaint",
     "res": "1280x720",
     "label": "안내 · 잠재 덧칠",
     "before": [
      "img/before/tut_repaint_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_repaint_1280x720.jpg"
     ]
    },
    {
     "id": "tut_return",
     "res": "1280x720",
     "label": "안내 · 복귀",
     "before": [
      "img/before/tut_return_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_return_1280x720.jpg"
     ]
    },
    {
     "id": "tut_shield",
     "res": "1280x720",
     "label": "안내 · 보호막",
     "before": [
      "img/before/tut_shield_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_shield_1280x720.jpg"
     ]
    },
    {
     "id": "tut_star",
     "res": "1280x720",
     "label": "안내 · 승급",
     "before": [
      "img/before/tut_star_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_star_1280x720.jpg"
     ]
    },
    {
     "id": "tut_story",
     "res": "1280x720",
     "label": "안내 · 이야기",
     "before": [
      "img/before/tut_story_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_story_1280x720.jpg"
     ]
    },
    {
     "id": "tut_study",
     "res": "1280x720",
     "label": "안내 · 색의 공명 연구",
     "before": [
      "img/before/tut_study_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_study_1280x720.jpg"
     ]
    },
    {
     "id": "tut_summon",
     "res": "1280x720",
     "label": "안내 · 소환 (채색석 1600)",
     "before": [
      "img/before/tut_summon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_summon_1280x720.jpg"
     ]
    },
    {
     "id": "tut_ult",
     "res": "1280x720",
     "label": "안내 · 궁극기 카드",
     "before": [
      "img/before/tut_ult_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_ult_1280x720.jpg"
     ]
    },
    {
     "id": "tut_upgrade",
     "res": "1280x720",
     "label": "안내 · 강화 버튼",
     "before": [
      "img/before/tut_upgrade_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_upgrade_1280x720.jpg"
     ]
    },
    {
     "id": "tut_whale",
     "res": "1280x720",
     "label": "안내 · 고래 강화",
     "before": [
      "img/before/tut_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_whale_1280x720.jpg"
     ]
    },
    {
     "id": "tut_wind",
     "res": "1280x720",
     "label": "안내 · 순풍 가속",
     "before": [
      "img/before/tut_wind_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_wind_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 10,
   "title": "글자 간격 점검 (퀘스트 5)",
   "area": "UI 공통",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "퀘스트 문구를 확정안 표 문구로 바꾸고 퀘스트 칸 글자 간격 재점검 (quest_chain5 캡처)",
   "novisual": "",
   "caps": [
    {
     "id": "quest_chain5",
     "res": "1280x720",
     "label": "항해 퀘스트 5번 문구 (글자 간격)",
     "before": [
      "img/before/quest_chain5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_chain5_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 11,
   "title": "잠긴 콘텐츠: 자물쇠 + 흑백 + 안내",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "시안 가 「자물쇠 배지 + 레벨 막대 알림」을 한 부품(scripts/ui/lock_gate.gd)으로 만들어 항해사 레벨로 잠긴 버튼 전부에 씀: 아래 메뉴(모험·분교 등 — 아이콘 위를 덮던 「항해사 Lv.N 필요」 글자 없앰), 복귀 버튼, 메뉴 위 허브·하위 탭(성장·장비 등), 아이 상세(장비 탭·장비 칸·장비 버튼·레벨 업·승급·소환하러 가기), 모험 등급전 카드, 자동 숨결. 잠긴 버튼 = 흑백 아이콘·흐린 이름 + 귀퉁이 남색 자물쇠 배지 + 아래 짧은 「Lv.N」 꼬리표. 누르면 버튼이 살짝 흔들리고 그 위(자리가 없으면 아래)에 꼬리 달린 남색 알림 「모험은 항해사 Lv.7에 열려요 · 퀘스트를 깨면 레벨이 올라요 · 지금 EXP x/y」 + 「지금 Lv.M ━ Lv.N」 막대. 장비 잠금 배지(fb-hero-gear-ui)도 같은 부품으로 합침. 전/후: before·after/locks_menu · locks_hero_info · locks_tap_school · locks_tap_tab · locks_tap_hero, 시안 대비 artifacts/feedback70/after/rewards_compare/11_locked_mockup_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh_after_guides",
     "res": "1280x720",
     "label": "첫 안내를 마친 뒤 HUD",
     "before": [
      "img/before/hud_fresh_after_guides_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_after_guides_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "locked_tap_fresh",
     "res": "1280x720",
     "label": "잠긴 메뉴를 눌렀을 때 (새 계정)",
     "before": [
      "img/before/locked_tap_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/locked_tap_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "locked_tap_mid",
     "res": "1280x720",
     "label": "잠긴 메뉴(모험)를 눌렀을 때",
     "before": [
      "img/before/locked_tap_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/locked_tap_mid_1280x720.jpg"
     ]
    },
    {
     "id": "locks_hero_info",
     "res": "1280x720",
     "label": "아이 상세 · 잠긴 장비 탭 · 레벨 업 · 승급 (항해사 Lv.3)",
     "before": [
      "img/before/locks_hero_info_1280x720.jpg"
     ],
     "after": [
      "img/after/locks_hero_info_1280x720.jpg"
     ]
    },
    {
     "id": "locks_hero_info",
     "res": "1600x720",
     "label": "아이 상세 · 잠긴 장비 탭 · 레벨 업 · 승급 (항해사 Lv.3)",
     "before": [
      "img/before/locks_hero_info_1600x720.jpg"
     ],
     "after": [
      "img/after/locks_hero_info_1600x720.jpg"
     ]
    },
    {
     "id": "locks_menu",
     "res": "1280x720",
     "label": "메뉴 위 탭 · 잠긴 허브 · 하위 탭 (항해사 Lv.3)",
     "before": [
      "img/before/locks_menu_1280x720.jpg"
     ],
     "after": [
      "img/after/locks_menu_1280x720.jpg"
     ]
    },
    {
     "id": "locks_menu",
     "res": "1600x720",
     "label": "메뉴 위 탭 · 잠긴 허브 · 하위 탭 (항해사 Lv.3)",
     "before": [
      "img/before/locks_menu_1600x720.jpg"
     ],
     "after": [
      "img/after/locks_menu_1600x720.jpg"
     ]
    },
    {
     "id": "locks_tap_hero",
     "res": "1280x720",
     "label": "아이 상세 · 잠긴 장비 탭을 눌렀을 때 · 알림",
     "before": [
      "img/before/locks_tap_hero_1280x720.jpg"
     ],
     "after": [
      "img/after/locks_tap_hero_1280x720.jpg"
     ]
    },
    {
     "id": "locks_tap_school",
     "res": "1280x720",
     "label": "잠긴 메뉴(분교)를 눌렀을 때 · 알림",
     "before": [
      "img/before/locks_tap_school_1280x720.jpg"
     ],
     "after": [
      "img/after/locks_tap_school_1280x720.jpg"
     ]
    },
    {
     "id": "locks_tap_tab",
     "res": "1280x720",
     "label": "잠긴 하위 탭(성장)을 눌렀을 때 · 알림",
     "before": [
      "img/before/locks_tap_tab_1280x720.jpg"
     ],
     "after": [
      "img/after/locks_tap_tab_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 12,
   "title": "퀘스트로 항해사 레벨 올리기",
   "area": "퀘스트·보상",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "체인 44줄 모두 항해사 경험치 지급 · 관문마다 퀘스트 EXP + 첫 정화 EXP = 그 레벨 필요 EXP (Lv.8까지), Lv.8 뒤 190+25(Lv-8) · 「다음 열림: X · Lv.N까지 EXP n」 함수 Quests.next_unlock_text(main) 제공(HUD 배치는 fb-battle-hud) · 옛 저장은 새 칸으로 옮기고 EXP 채움 · guide_chain_check 통과 · [UI] 왼쪽 위 통합 판에 늘 보이는 계정 줄 추가(「다음 열림」 라벤더 꼬리표 / Lv.8부터 금빛 「다음 레벨 보상」, 경험치가 바뀔 때만 갱신, 1280·1600 넘침 없음) · 경험치만 주는 퀘스트 보상 칸에 새 EXP 아이콘(assets/ui/icon_exp.png, 금빛 별) · 전/후: hud_unlock_lv2/lv9_1280x720·1600x720",
   "novisual": "",
   "caps": [
    {
     "id": "fresh_reward_1",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [
      "img/before/fresh_reward_1_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_1_1280x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_1",
     "res": "1600x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [],
     "after": [
      "img/after/fresh_reward_1_1600x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_2",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 2) · 퀘스트 완료!",
     "before": [
      "img/before/fresh_reward_2_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_arena_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_build_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_bulk_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_equip_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_formation_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 편성 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_formation_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_front_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_growth_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_recommend_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_repaint_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_return_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_star_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_study_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_summon_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_whale_reward_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh_after_guides",
     "res": "1280x720",
     "label": "첫 안내를 마친 뒤 HUD",
     "before": [
      "img/before/hud_fresh_after_guides_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_after_guides_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "hud_unlock_lv2",
     "res": "1280x720",
     "label": "왼쪽 위 판 「다음 열림」 + EXP 퀘스트 카드",
     "before": [
      "img/before/hud_unlock_lv2_1280x720.png"
     ],
     "after": [
      "img/after/hud_unlock_lv2_1280x720.png"
     ]
    },
    {
     "id": "hud_unlock_lv2",
     "res": "1600x720",
     "label": "왼쪽 위 판 「다음 열림」 + EXP 퀘스트 카드",
     "before": [
      "img/before/hud_unlock_lv2_1600x720.png"
     ],
     "after": [
      "img/after/hud_unlock_lv2_1600x720.png"
     ]
    },
    {
     "id": "hud_unlock_lv9",
     "res": "1280x720",
     "label": "왼쪽 위 판 「다음 레벨 보상」(Lv.9) + EXP 퀘스트 카드",
     "before": [
      "img/before/hud_unlock_lv9_1280x720.png"
     ],
     "after": [
      "img/after/hud_unlock_lv9_1280x720.png"
     ]
    },
    {
     "id": "hud_unlock_lv9",
     "res": "1600x720",
     "label": "왼쪽 위 판 「다음 레벨 보상」(Lv.9) + EXP 퀘스트 카드",
     "before": [
      "img/before/hud_unlock_lv9_1600x720.png"
     ],
     "after": [
      "img/after/hud_unlock_lv9_1600x720.png"
     ]
    },
    {
     "id": "quest_claim",
     "res": "1280x720",
     "label": "퀘스트 받기 → 재화가 날아가 HUD 숫자 증가",
     "before": [
      "img/before/quest_claim_f1_1280x720.jpg",
      "img/before/quest_claim_f2_1280x720.jpg",
      "img/before/quest_claim_f3_1280x720.jpg",
      "img/before/quest_claim_f4_1280x720.jpg",
      "img/before/quest_claim_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_claim_f1_1280x720.jpg",
      "img/after/quest_claim_f2_1280x720.jpg",
      "img/after/quest_claim_f3_1280x720.jpg",
      "img/after/quest_claim_f4_1280x720.jpg",
      "img/after/quest_claim_f5_1280x720.jpg"
     ]
    },
    {
     "id": "quest_ready",
     "res": "1280x720",
     "label": "항해 퀘스트 완료 표시",
     "before": [
      "img/before/quest_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_ready_1280x720.jpg"
     ]
    },
    {
     "id": "quest_reward_popup",
     "res": "1280x720",
     "label": "퀘스트 보상 팝업 (경험치 포함)",
     "before": [
      "img/before/quest_reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_reward_popup_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 13,
   "title": "다음 퀘스트 예고 없애기",
   "area": "퀘스트·보상",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "퀘스트 카드 밑 「다음: … 열림까지 N단계」 줄 제거 (progression_profile_check 기대값도 '없음'으로)",
   "novisual": "",
   "caps": [
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh_after_guides",
     "res": "1280x720",
     "label": "첫 안내를 마친 뒤 HUD",
     "before": [
      "img/before/hud_fresh_after_guides_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_after_guides_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "quest_chain5",
     "res": "1280x720",
     "label": "항해 퀘스트 5번 문구 (글자 간격)",
     "before": [
      "img/before/quest_chain5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_chain5_1280x720.jpg"
     ]
    },
    {
     "id": "quest_ready",
     "res": "1280x720",
     "label": "항해 퀘스트 완료 표시",
     "before": [
      "img/before/quest_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_ready_1280x720.jpg"
     ]
    },
    {
     "id": "tut_quest",
     "res": "1280x720",
     "label": "안내 · 퀘스트 받기",
     "before": [
      "img/before/tut_quest_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_quest_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 14,
   "title": "재화가 날아온 뒤에 숫자 올리기",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "처치 · 퀘스트 보상 재화는 저장엔 바로 들어가고 화면 숫자는 날아간 빛이 재화 칸에 닿을 때 오름 (hud.flying, 도중에 빛이 지워져도 숫자가 덜 보인 채 남지 않음). feedback70_battle_check 35/35: 첫 빛 도착 607ms · 숫자 오름 612ms, 나는 동안 숫자 1,000 그대로",
   "novisual": "",
   "caps": [
    {
     "id": "currency_fly",
     "res": "1280x720",
     "label": "재화 아이콘이 오른쪽 위 재화 칸으로 날아감",
     "before": [
      "img/before/currency_fly_f1_1280x720.jpg",
      "img/before/currency_fly_f2_1280x720.jpg",
      "img/before/currency_fly_f3_1280x720.jpg",
      "img/before/currency_fly_f4_1280x720.jpg",
      "img/before/currency_fly_f5_1280x720.jpg",
      "img/before/currency_fly_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/currency_fly_f1_1280x720.jpg",
      "img/after/currency_fly_f2_1280x720.jpg",
      "img/after/currency_fly_f3_1280x720.jpg",
      "img/after/currency_fly_f4_1280x720.jpg",
      "img/after/currency_fly_f5_1280x720.jpg",
      "img/after/currency_fly_f6_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "quest_claim",
     "res": "1280x720",
     "label": "퀘스트 받기 → 재화가 날아가 HUD 숫자 증가",
     "before": [
      "img/before/quest_claim_f1_1280x720.jpg",
      "img/before/quest_claim_f2_1280x720.jpg",
      "img/before/quest_claim_f3_1280x720.jpg",
      "img/before/quest_claim_f4_1280x720.jpg",
      "img/before/quest_claim_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_claim_f1_1280x720.jpg",
      "img/after/quest_claim_f2_1280x720.jpg",
      "img/after/quest_claim_f3_1280x720.jpg",
      "img/after/quest_claim_f4_1280x720.jpg",
      "img/after/quest_claim_f5_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 15,
   "title": "스테이지 클리어 UI",
   "area": "전투 HUD",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "stage_clear_transition",
     "res": "1280x720",
     "label": "스테이지 정화(CLEAR) → 항해 → 다음 STAGE 띠",
     "before": [
      "img/before/stage_clear_transition_f1_1280x720.jpg",
      "img/before/stage_clear_transition_f2_1280x720.jpg",
      "img/before/stage_clear_transition_f3_1280x720.jpg",
      "img/before/stage_clear_transition_f4_1280x720.jpg",
      "img/before/stage_clear_transition_f5_1280x720.jpg",
      "img/before/stage_clear_transition_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/stage_clear_transition_f1_1280x720.jpg",
      "img/after/stage_clear_transition_f2_1280x720.jpg",
      "img/after/stage_clear_transition_f3_1280x720.jpg",
      "img/after/stage_clear_transition_f4_1280x720.jpg",
      "img/after/stage_clear_transition_f5_1280x720.jpg",
      "img/after/stage_clear_transition_f6_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 16,
   "title": "글자 넘침 점검",
   "area": "UI 공통",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gear_list",
     "res": "1280x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1280x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1600x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1600x720.jpg"
     ]
    },
    {
     "id": "hero_info",
     "res": "1280x720",
     "label": "아이 정보 (상세)",
     "before": [
      "img/before/hero_info_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_info_1280x720.jpg"
     ]
    },
    {
     "id": "hero_info",
     "res": "1600x720",
     "label": "아이 정보 (상세)",
     "before": [
      "img/before/hero_info_1600x720.jpg"
     ],
     "after": [
      "img/after/hero_info_1600x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1280x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1600x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1600x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1280x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1280x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1600x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 17,
   "title": "채색 폭주 (피버)",
   "area": "연출",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "combo_before_fever",
     "res": "1280x720",
     "label": "연속 처치 콤보 (폭주 직전)",
     "before": [
      "img/before/combo_before_fever_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "fever",
     "res": "1280x720",
     "label": "채색 폭주 (FEVER) 시작",
     "before": [
      "img/before/fever_f1_1280x720.jpg",
      "img/before/fever_f2_1280x720.jpg",
      "img/before/fever_f3_1280x720.jpg",
      "img/before/fever_f4_1280x720.jpg",
      "img/before/fever_f5_1280x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 18,
   "title": "새 아이 자동 편성 안 함 + 안내",
   "area": "편성",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "새 아이는 언제나 갑판 밖에서 시작(자동 편성 없음, PD 결정대로 예외 없음). 빈 칸 + 대기 아이가 있으면 「편성」에 빨간 점. 새 캡처 join_empty_slot 추가(다음 실행에서 찍힘)",
   "novisual": "",
   "caps": [
    {
     "id": "formation",
     "res": "1280x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_1280x720.jpg"
     ]
    },
    {
     "id": "formation",
     "res": "1600x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_1600x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1280x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1280x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1600x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1600x720.jpg"
     ]
    },
    {
     "id": "join_empty_slot",
     "res": "1280x720",
     "label": "빈 칸이 있을 때 새 아이 합류 (자동 편성 없음 · 편성 점)",
     "before": [],
     "after": [
      "img/after/join_empty_slot_1280x720.jpg"
     ]
    },
    {
     "id": "join_new_hero",
     "res": "1280x720",
     "label": "새 아이 합류 직후 (갑판이 차 있을 때)",
     "before": [
      "img/before/join_new_hero_1280x720.jpg"
     ],
     "after": [
      "img/after/join_new_hero_1280x720.jpg"
     ]
    },
    {
     "id": "tut_formation",
     "res": "1280x720",
     "label": "안내 · 편성",
     "before": [
      "img/before/tut_formation_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_formation_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 19,
   "title": "고래 숨결: 궁극기 컷인 없이 · 품질",
   "area": "연출",
   "status": "완료",
   "owner": "skywhale-effect",
   "note": "컷인 띠 삭제, 누르는 즉시 발사. 셰이더 물감 안개+빛 리본 세 가닥+빛 알갱이로 부서지는 가장자리, 앞머리가 닿는 순간 적마다 색이 피고 보스는 3타로 나눠 맞음(합 동일)",
   "novisual": "",
   "caps": [
    {
     "id": "breath_cast",
     "res": "1280x720",
     "label": "고래 숨결 사용 연출",
     "before": [
      "img/before/breath_cast_f1_1280x720.jpg",
      "img/before/breath_cast_f2_1280x720.jpg",
      "img/before/breath_cast_f3_1280x720.jpg",
      "img/before/breath_cast_f4_1280x720.jpg",
      "img/before/breath_cast_f5_1280x720.jpg",
      "img/before/breath_cast_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_cast_f1_1280x720.jpg",
      "img/after/breath_cast_f2_1280x720.jpg",
      "img/after/breath_cast_f3_1280x720.jpg",
      "img/after/breath_cast_f4_1280x720.jpg",
      "img/after/breath_cast_f5_1280x720.jpg",
      "img/after/breath_cast_f6_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1280x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1600x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1600x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1600x720.jpg"
     ]
    },
    {
     "id": "tut_breath",
     "res": "1280x720",
     "label": "안내 · 고래 숨결",
     "before": [
      "img/before/tut_breath_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_breath_1280x720.jpg"
     ]
    },
    {
     "id": "ult_cutin",
     "res": "1280x720",
     "label": "궁극기 컷인 → 궁극기 (SS)",
     "before": [
      "img/before/ult_cutin_f1_1280x720.jpg",
      "img/before/ult_cutin_f2_1280x720.jpg",
      "img/before/ult_cutin_f3_1280x720.jpg",
      "img/before/ult_cutin_f4_1280x720.jpg",
      "img/before/ult_cutin_f5_1280x720.jpg",
      "img/before/ult_cutin_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/ult_cutin_f1_1280x720.jpg",
      "img/after/ult_cutin_f2_1280x720.jpg",
      "img/after/ult_cutin_f3_1280x720.jpg",
      "img/after/ult_cutin_f4_1280x720.jpg",
      "img/after/ult_cutin_f5_1280x720.jpg",
      "img/after/ult_cutin_f6_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 20,
   "title": "성장 기록 「모두 받기」 반응",
   "area": "아이들·성장",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "시안 가 「연쇄 점등」(scripts/ui/codex_claim_fx.gd): 누르면 보이는 받을 마름모(아이 카드 + 오른쪽 기록 줄)가 앞에서부터 차례로 금빛으로 부풀었다가 받음 라벤더로 가라앉고, 빛 알갱이(받은 기록 수만큼 6~14개)가 휘어 날아가 「모든 아이 공격 · 고래 보호막」 숫자에 닿을 때마다 숫자가 반짝·튀고 옆 금빛 꼬리표 「+0.73%」가 올라가며, 마지막에 「모두 받기」 아래에 채색석 합계(+1,770)가 톡 뜸. 기록 보너스는 달성 때 이미 합계에 들어가 있어(화면 문구 「보상 수령과 무관」) 합계 숫자를 깎았다 올리지 않고, 받은 기록들의 몫을 옆 꼬리표로 세어 올림 — 게임 수치·저장은 그대로. 전/후: hero_codex_claim_all(같은 시각표) · hero_codex_chain(긴 띠, 1280·1600), 시안 대비 artifacts/feedback70/after/rewards_compare/20_growth_claim_mockup_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "hero_codex",
     "res": "1280x720",
     "label": "성장 기록",
     "before": [
      "img/before/hero_codex_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_1280x720.jpg"
     ]
    },
    {
     "id": "hero_codex",
     "res": "1600x720",
     "label": "성장 기록",
     "before": [
      "img/before/hero_codex_1600x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_1600x720.jpg"
     ]
    },
    {
     "id": "hero_codex_chain",
     "res": "1280x720",
     "label": "성장 기록 「모두 받기」 (긴 띠)",
     "before": [
      "img/before/hero_codex_chain_f1_1280x720.jpg",
      "img/before/hero_codex_chain_f2_1280x720.jpg",
      "img/before/hero_codex_chain_f3_1280x720.jpg",
      "img/before/hero_codex_chain_f4_1280x720.jpg",
      "img/before/hero_codex_chain_f5_1280x720.jpg",
      "img/before/hero_codex_chain_f6_1280x720.jpg",
      "img/before/hero_codex_chain_f7_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_chain_f1_1280x720.jpg",
      "img/after/hero_codex_chain_f2_1280x720.jpg",
      "img/after/hero_codex_chain_f3_1280x720.jpg",
      "img/after/hero_codex_chain_f4_1280x720.jpg",
      "img/after/hero_codex_chain_f5_1280x720.jpg",
      "img/after/hero_codex_chain_f6_1280x720.jpg",
      "img/after/hero_codex_chain_f7_1280x720.jpg"
     ]
    },
    {
     "id": "hero_codex_chain",
     "res": "1600x720",
     "label": "성장 기록 「모두 받기」 (긴 띠)",
     "before": [
      "img/before/hero_codex_chain_f1_1600x720.jpg",
      "img/before/hero_codex_chain_f2_1600x720.jpg",
      "img/before/hero_codex_chain_f3_1600x720.jpg",
      "img/before/hero_codex_chain_f4_1600x720.jpg",
      "img/before/hero_codex_chain_f5_1600x720.jpg",
      "img/before/hero_codex_chain_f6_1600x720.jpg",
      "img/before/hero_codex_chain_f7_1600x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_chain_f1_1600x720.jpg",
      "img/after/hero_codex_chain_f2_1600x720.jpg",
      "img/after/hero_codex_chain_f3_1600x720.jpg",
      "img/after/hero_codex_chain_f4_1600x720.jpg",
      "img/after/hero_codex_chain_f5_1600x720.jpg",
      "img/after/hero_codex_chain_f6_1600x720.jpg",
      "img/after/hero_codex_chain_f7_1600x720.jpg"
     ]
    },
    {
     "id": "hero_codex_claim_all",
     "res": "1280x720",
     "label": "성장 기록 「모두 받기」",
     "before": [
      "img/before/hero_codex_claim_all_f1_1280x720.jpg",
      "img/before/hero_codex_claim_all_f2_1280x720.jpg",
      "img/before/hero_codex_claim_all_f3_1280x720.jpg",
      "img/before/hero_codex_claim_all_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_claim_all_f1_1280x720.jpg",
      "img/after/hero_codex_claim_all_f2_1280x720.jpg",
      "img/after/hero_codex_claim_all_f3_1280x720.jpg",
      "img/after/hero_codex_claim_all_f4_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 21,
   "title": "바람 조각 · 구름 진주의 + 버튼 없애기",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "바람 조각 · 구름 진주의 + 제거, 채색석에만 + (상점으로)",
   "novisual": "",
   "caps": [
    {
     "id": "currency_fly",
     "res": "1280x720",
     "label": "재화 아이콘이 오른쪽 위 재화 칸으로 날아감",
     "before": [
      "img/before/currency_fly_f1_1280x720.jpg",
      "img/before/currency_fly_f2_1280x720.jpg",
      "img/before/currency_fly_f3_1280x720.jpg",
      "img/before/currency_fly_f4_1280x720.jpg",
      "img/before/currency_fly_f5_1280x720.jpg",
      "img/before/currency_fly_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/currency_fly_f1_1280x720.jpg",
      "img/after/currency_fly_f2_1280x720.jpg",
      "img/after/currency_fly_f3_1280x720.jpg",
      "img/after/currency_fly_f4_1280x720.jpg",
      "img/after/currency_fly_f5_1280x720.jpg",
      "img/after/currency_fly_f6_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "menu_shop",
     "res": "1280x720",
     "label": "상점",
     "before": [
      "img/before/menu_shop_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_shop_1280x720.jpg"
     ]
    },
    {
     "id": "menu_shop",
     "res": "1600x720",
     "label": "상점",
     "before": [
      "img/before/menu_shop_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_shop_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 22,
   "title": "채색석 1600 안내 → 10연 소환으로",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "Lv.2 소환 퀘스트(#15): 첫 출석 선물 채색석 1600 → 「소환」 → 「10회 소환」까지 손가락으로 짚음 (소환 배너 #39 전까지는 배너 칸 생략)",
   "novisual": "",
   "caps": [
    {
     "id": "guide_summon_1",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (1)",
     "before": [],
     "after": [
      "img/after/guide_summon_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_2",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (2)",
     "before": [],
     "after": [
      "img/after/guide_summon_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_3",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (3)",
     "before": [],
     "after": [
      "img/after/guide_summon_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_4",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_summon_4_1280x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1280x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1280x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1600x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1600x720.jpg"
     ]
    },
    {
     "id": "tut_summon",
     "res": "1280x720",
     "label": "안내 · 소환 (채색석 1600)",
     "before": [
      "img/before/tut_summon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_summon_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 23,
   "title": "소환 칠하기: 가운데만 · 더 강하게",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_paint",
     "res": "1280x720",
     "label": "소환 · 손가락으로 칠하기",
     "before": [
      "img/before/gacha_paint_f1_1280x720.jpg",
      "img/before/gacha_paint_f2_1280x720.jpg",
      "img/before/gacha_paint_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_paint_f1_1280x720.jpg",
      "img/after/gacha_paint_f2_1280x720.jpg",
      "img/after/gacha_paint_f3_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_paint_prompt",
     "res": "1280x720",
     "label": "소환 · 칠하기 안내 (잿빛 출석부)",
     "before": [
      "img/before/gacha_paint_prompt_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_paint_prompt_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 24,
   "title": "신화 조각 획득 연출",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_ten_result",
     "res": "1280x720",
     "label": "10연 소환 결과 · 신화 조각",
     "before": [
      "img/before/gacha_ten_result_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_result_1280x720.jpg"
     ]
    },
    {
     "id": "mythic_shop",
     "res": "1280x720",
     "label": "신화 조각 상점",
     "before": [
      "img/before/mythic_shop_1280x720.jpg"
     ],
     "after": [
      "img/after/mythic_shop_1280x720.jpg"
     ]
    },
    {
     "id": "mythic_shop",
     "res": "1600x720",
     "label": "신화 조각 상점",
     "before": [
      "img/before/mythic_shop_1600x720.jpg"
     ],
     "after": [
      "img/after/mythic_shop_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 25,
   "title": "10연 결과에 신화 조각 표시",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_ten_cards",
     "res": "1280x720",
     "label": "10연 소환 · 카드 펼침",
     "before": [
      "img/before/gacha_ten_cards_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_cards_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_ten_result",
     "res": "1280x720",
     "label": "10연 소환 결과 · 신화 조각",
     "before": [
      "img/before/gacha_ten_result_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_result_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 26,
   "title": "등급별 등장 연출 (B/A/S/SS)",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_reveal_A",
     "res": "1280x720",
     "label": "소환 등급 연출 · A (새 아이)",
     "before": [
      "img/before/gacha_reveal_A_f1_1280x720.jpg",
      "img/before/gacha_reveal_A_f2_1280x720.jpg",
      "img/before/gacha_reveal_A_f3_1280x720.jpg",
      "img/before/gacha_reveal_A_f4_1280x720.jpg",
      "img/before/gacha_reveal_A_f5_1280x720.jpg",
      "img/before/gacha_reveal_A_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_A_f1_1280x720.jpg",
      "img/after/gacha_reveal_A_f2_1280x720.jpg",
      "img/after/gacha_reveal_A_f3_1280x720.jpg",
      "img/after/gacha_reveal_A_f4_1280x720.jpg",
      "img/after/gacha_reveal_A_f5_1280x720.jpg",
      "img/after/gacha_reveal_A_f6_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_reveal_B",
     "res": "1280x720",
     "label": "소환 등급 연출 · B (새 아이)",
     "before": [
      "img/before/gacha_reveal_B_f1_1280x720.jpg",
      "img/before/gacha_reveal_B_f2_1280x720.jpg",
      "img/before/gacha_reveal_B_f3_1280x720.jpg",
      "img/before/gacha_reveal_B_f4_1280x720.jpg",
      "img/before/gacha_reveal_B_f5_1280x720.jpg",
      "img/before/gacha_reveal_B_f6_1280x720.jpg",
      "img/before/gacha_reveal_B_f7_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_B_f1_1280x720.jpg",
      "img/after/gacha_reveal_B_f2_1280x720.jpg",
      "img/after/gacha_reveal_B_f3_1280x720.jpg",
      "img/after/gacha_reveal_B_f4_1280x720.jpg",
      "img/after/gacha_reveal_B_f5_1280x720.jpg",
      "img/after/gacha_reveal_B_f6_1280x720.jpg",
      "img/after/gacha_reveal_B_f7_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_reveal_S",
     "res": "1280x720",
     "label": "소환 등급 연출 · S (새 아이)",
     "before": [
      "img/before/gacha_reveal_S_f1_1280x720.jpg",
      "img/before/gacha_reveal_S_f2_1280x720.jpg",
      "img/before/gacha_reveal_S_f3_1280x720.jpg",
      "img/before/gacha_reveal_S_f4_1280x720.jpg",
      "img/before/gacha_reveal_S_f5_1280x720.jpg",
      "img/before/gacha_reveal_S_f6_1280x720.jpg",
      "img/before/gacha_reveal_S_f7_1280x720.jpg",
      "img/before/gacha_reveal_S_f8_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_S_f1_1280x720.jpg",
      "img/after/gacha_reveal_S_f2_1280x720.jpg",
      "img/after/gacha_reveal_S_f3_1280x720.jpg",
      "img/after/gacha_reveal_S_f4_1280x720.jpg",
      "img/after/gacha_reveal_S_f5_1280x720.jpg",
      "img/after/gacha_reveal_S_f6_1280x720.jpg",
      "img/after/gacha_reveal_S_f7_1280x720.jpg",
      "img/after/gacha_reveal_S_f8_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_reveal_SS",
     "res": "1280x720",
     "label": "소환 등급 연출 · SS (새 아이)",
     "before": [
      "img/before/gacha_reveal_SS_f1_1280x720.jpg",
      "img/before/gacha_reveal_SS_f2_1280x720.jpg",
      "img/before/gacha_reveal_SS_f3_1280x720.jpg",
      "img/before/gacha_reveal_SS_f4_1280x720.jpg",
      "img/before/gacha_reveal_SS_f5_1280x720.jpg",
      "img/before/gacha_reveal_SS_f6_1280x720.jpg",
      "img/before/gacha_reveal_SS_f7_1280x720.jpg",
      "img/before/gacha_reveal_SS_f8_1280x720.jpg",
      "img/before/gacha_reveal_SS_f9_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_SS_f1_1280x720.jpg",
      "img/after/gacha_reveal_SS_f2_1280x720.jpg",
      "img/after/gacha_reveal_SS_f3_1280x720.jpg",
      "img/after/gacha_reveal_SS_f4_1280x720.jpg",
      "img/after/gacha_reveal_SS_f5_1280x720.jpg",
      "img/after/gacha_reveal_SS_f6_1280x720.jpg",
      "img/after/gacha_reveal_SS_f7_1280x720.jpg",
      "img/after/gacha_reveal_SS_f8_1280x720.jpg",
      "img/after/gacha_reveal_SS_f9_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_ten_cards",
     "res": "1280x720",
     "label": "10연 소환 · 카드 펼침",
     "before": [
      "img/before/gacha_ten_cards_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_cards_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_ten_deal",
     "res": "1280x720",
     "label": "10연 소환 · 카드 한 장씩",
     "before": [
      "img/before/gacha_ten_deal_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_deal_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 27,
   "title": "SS 시네마틱",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_reveal_SS",
     "res": "1280x720",
     "label": "소환 등급 연출 · SS (새 아이)",
     "before": [
      "img/before/gacha_reveal_SS_f1_1280x720.jpg",
      "img/before/gacha_reveal_SS_f2_1280x720.jpg",
      "img/before/gacha_reveal_SS_f3_1280x720.jpg",
      "img/before/gacha_reveal_SS_f4_1280x720.jpg",
      "img/before/gacha_reveal_SS_f5_1280x720.jpg",
      "img/before/gacha_reveal_SS_f6_1280x720.jpg",
      "img/before/gacha_reveal_SS_f7_1280x720.jpg",
      "img/before/gacha_reveal_SS_f8_1280x720.jpg",
      "img/before/gacha_reveal_SS_f9_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_SS_f1_1280x720.jpg",
      "img/after/gacha_reveal_SS_f2_1280x720.jpg",
      "img/after/gacha_reveal_SS_f3_1280x720.jpg",
      "img/after/gacha_reveal_SS_f4_1280x720.jpg",
      "img/after/gacha_reveal_SS_f5_1280x720.jpg",
      "img/after/gacha_reveal_SS_f6_1280x720.jpg",
      "img/after/gacha_reveal_SS_f7_1280x720.jpg",
      "img/after/gacha_reveal_SS_f8_1280x720.jpg",
      "img/after/gacha_reveal_SS_f9_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 28,
   "title": "색 지도를 열면 방치 진행이 멈춤",
   "area": "색 지도",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "color_map",
     "res": "1280x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "color_map",
     "res": "1600x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "color_restore",
     "res": "1280x720",
     "label": "색 지도 열기 → 다 칠한 곳 복원 장면 · 영구 보너스",
     "before": [
      "img/before/color_restore_f1_1280x720.jpg",
      "img/before/color_restore_f2_1280x720.jpg",
      "img/before/color_restore_f3_1280x720.jpg",
      "img/before/color_restore_f4_1280x720.jpg",
      "img/before/color_restore_f5_1280x720.jpg",
      "img/before/color_restore_f6_1280x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 29,
   "title": "색 지도 보상 · 의미 전달",
   "area": "색 지도",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "color_map",
     "res": "1280x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "color_map",
     "res": "1600x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "color_restore",
     "res": "1280x720",
     "label": "색 지도 열기 → 다 칠한 곳 복원 장면 · 영구 보너스",
     "before": [
      "img/before/color_restore_f1_1280x720.jpg",
      "img/before/color_restore_f2_1280x720.jpg",
      "img/before/color_restore_f3_1280x720.jpg",
      "img/before/color_restore_f4_1280x720.jpg",
      "img/before/color_restore_f5_1280x720.jpg",
      "img/before/color_restore_f6_1280x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 30,
   "title": "순풍 가속을 피버처럼",
   "area": "연출",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "tut_wind",
     "res": "1280x720",
     "label": "안내 · 순풍 가속",
     "before": [
      "img/before/tut_wind_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_wind_1280x720.jpg"
     ]
    },
    {
     "id": "wind_active",
     "res": "1280x720",
     "label": "순풍 가속 사용 (3배속)",
     "before": [
      "img/before/wind_active_f1_1280x720.jpg",
      "img/before/wind_active_f2_1280x720.jpg",
      "img/before/wind_active_f3_1280x720.jpg",
      "img/before/wind_active_f4_1280x720.jpg",
      "img/before/wind_active_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/wind_active_f1_1280x720.jpg",
      "img/after/wind_active_f2_1280x720.jpg",
      "img/after/wind_active_f3_1280x720.jpg",
      "img/after/wind_active_f4_1280x720.jpg",
      "img/after/wind_active_f5_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 31,
   "title": "보스 약점을 체력 막대에",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "보스 판(오른쪽 위 기운 짙은 판) 아래에 흰 「약점」 알약: 속성 구슬(7속성 표지를 직접 그림) + 「약점 별」. 잿빛성처럼 약점 없는 판은 숨김. 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "boss_intro",
     "res": "1280x720",
     "label": "보스 등장 · 위쪽 스테이지/보스 UI",
     "before": [
      "img/before/boss_intro_f1_1280x720.jpg",
      "img/before/boss_intro_f2_1280x720.jpg",
      "img/before/boss_intro_f3_1280x720.jpg",
      "img/before/boss_intro_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/boss_intro_f1_1280x720.jpg",
      "img/after/boss_intro_f2_1280x720.jpg",
      "img/after/boss_intro_f3_1280x720.jpg",
      "img/after/boss_intro_f4_1280x720.jpg"
     ]
    },
    {
     "id": "boss_rapid_hits",
     "res": "1280x720",
     "label": "보스 체력 막대 · 연타 (노란 지연 막대)",
     "before": [
      "img/before/boss_rapid_hits_f1_1280x720.jpg",
      "img/before/boss_rapid_hits_f2_1280x720.jpg",
      "img/before/boss_rapid_hits_f3_1280x720.jpg",
      "img/before/boss_rapid_hits_f4_1280x720.jpg",
      "img/before/boss_rapid_hits_f5_1280x720.jpg",
      "img/before/boss_rapid_hits_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/boss_rapid_hits_f1_1280x720.jpg",
      "img/after/boss_rapid_hits_f2_1280x720.jpg",
      "img/after/boss_rapid_hits_f3_1280x720.jpg",
      "img/after/boss_rapid_hits_f4_1280x720.jpg",
      "img/after/boss_rapid_hits_f5_1280x720.jpg",
      "img/after/boss_rapid_hits_f6_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1280x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1600x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 32,
   "title": "궁극기 컷인 품질",
   "area": "연출",
   "status": "완료",
   "owner": "skywhale-effect",
   "note": "최종: PD 선택 A 「아틀리에 붓질」을 모든 영웅·등급에 적용 — 배경 뺀 컷인 그림 13장이 크림 수채 종이 위 속성 색 물감 한 획(진한 테두리·그림자로 보라·노랑도 또렷, 늘 캐릭터 뒤) 앞에 섬, SS 속성 서명·신화 무지개, B·C 코드 제거. 전/후 영상: design/mockups/feedback70/cutin/#final. 이전 2차: 왼쪽 빈 틈 메움(그림이 늘 화면 밖까지 · 왼쪽 빛무리) · 위아래 장식 줄 양 끝 빛 알갱이로 옅게. 그림 쪽 시안 3개(아틀리에 붓질 · 전장 위 빛의 창 · 대각 분할) PD 선택 대기: design/mockups/feedback70/cutin/ — 캐릭터만 올리려면 투명 컷인 그림 13장 필요. 1차:띠 바탕·글자 판을 셰이더로(빛무리·성운·빛 알갱이·여는 빛 훑기·사선 빛 번짐), 기술 이름 물감 그라데이션+빛 훑기, 빛가루가 선에서 태어나 흐르고 접힐 때 흩어짐. SS 프리즘·신화 금 세공+홀로그램·조금 더 길게",
   "novisual": "",
   "caps": [
    {
     "id": "tut_ult",
     "res": "1280x720",
     "label": "안내 · 궁극기 카드",
     "before": [
      "img/before/tut_ult_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_ult_1280x720.jpg"
     ]
    },
    {
     "id": "ult_cutin",
     "res": "1280x720",
     "label": "궁극기 컷인 → 궁극기 (SS)",
     "before": [
      "img/before/ult_cutin_f1_1280x720.jpg",
      "img/before/ult_cutin_f2_1280x720.jpg",
      "img/before/ult_cutin_f3_1280x720.jpg",
      "img/before/ult_cutin_f4_1280x720.jpg",
      "img/before/ult_cutin_f5_1280x720.jpg",
      "img/before/ult_cutin_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/ult_cutin_f1_1280x720.jpg",
      "img/after/ult_cutin_f2_1280x720.jpg",
      "img/after/ult_cutin_f3_1280x720.jpg",
      "img/after/ult_cutin_f4_1280x720.jpg",
      "img/after/ult_cutin_f5_1280x720.jpg",
      "img/after/ult_cutin_f6_1280x720.jpg"
     ]
    },
    {
     "id": "ult_cutin_a",
     "res": "1280x720",
     "label": "궁극기 컷인 (일반 등급)",
     "before": [
      "img/before/ult_cutin_a_f1_1280x720.jpg",
      "img/before/ult_cutin_a_f2_1280x720.jpg",
      "img/before/ult_cutin_a_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/ult_cutin_a_f1_1280x720.jpg",
      "img/after/ult_cutin_a_f2_1280x720.jpg",
      "img/after/ult_cutin_a_f3_1280x720.jpg"
     ]
    },
    {
     "id": "ult_cutin_mythic",
     "res": "1280x720",
     "label": "궁극기 컷인 (신화 등급)",
     "before": [],
     "after": [
      "img/after/ult_cutin_mythic_f1_1280x720.jpg",
      "img/after/ult_cutin_mythic_f2_1280x720.jpg",
      "img/after/ult_cutin_mythic_f3_1280x720.jpg",
      "img/after/ult_cutin_mythic_f4_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 33,
   "title": "적 등장 다양화 · 종류",
   "area": "전투·밸런스",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "enemy_wave",
     "res": "1280x720",
     "label": "적 등장 (종류 · 수)",
     "before": [
      "img/before/enemy_wave_f1_1280x720.jpg",
      "img/before/enemy_wave_f2_1280x720.jpg",
      "img/before/enemy_wave_f3_1280x720.jpg",
      "img/before/enemy_wave_f4_1280x720.jpg",
      "img/before/enemy_wave_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/enemy_wave_f1_1280x720.jpg",
      "img/after/enemy_wave_f2_1280x720.jpg",
      "img/after/enemy_wave_f3_1280x720.jpg",
      "img/after/enemy_wave_f4_1280x720.jpg",
      "img/after/enemy_wave_f5_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 34,
   "title": "보상 아이콘",
   "area": "퀘스트·보상",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_element_reward",
     "res": "1280x720",
     "label": "원소섬 보상 팝업",
     "before": [
      "img/before/adv_element_reward_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "fresh_reward_1",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [
      "img/before/fresh_reward_1_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_1_1280x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_1",
     "res": "1600x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [],
     "after": [
      "img/after/fresh_reward_1_1600x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_2",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 2) · 퀘스트 완료!",
     "before": [
      "img/before/fresh_reward_2_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_arena_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_build_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_bulk_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_equip_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_formation_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 편성 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_formation_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_front_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_growth_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_recommend_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_repaint_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_return_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_star_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_study_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_summon_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 소환 (채색석 1600) 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_summon_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_upgrade_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 강화 버튼 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_upgrade_reward_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_reward",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 보상 (경험치 포함)",
     "before": [],
     "after": [
      "img/after/guide_whale_reward_1280x720.jpg"
     ]
    },
    {
     "id": "quest_reward_popup",
     "res": "1280x720",
     "label": "퀘스트 보상 팝업 (경험치 포함)",
     "before": [
      "img/before/quest_reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_reward_popup_1280x720.jpg"
     ]
    },
    {
     "id": "return_reward",
     "res": "1280x720",
     "label": "귀환 보상",
     "before": [
      "img/before/return_reward_1280x720.jpg"
     ],
     "after": [
      "img/after/return_reward_1280x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1280x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1280x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1600x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1600x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1600x720.jpg"
     ]
    },
    {
     "id": "start_popup_1",
     "res": "1280x720",
     "label": "접속 보상 팝업 1 · 출석 보상",
     "before": [
      "img/before/start_popup_1_1280x720.jpg"
     ],
     "after": [
      "img/after/start_popup_1_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 35,
   "title": "스테이지 · 보스 상단 UI",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "시안 B: 왼쪽 위 통합 판(초상 + 금빛 경험치 고리 · 항해사 Lv · 전투력 | 기운 STAGE 배지(보스 칸 장밋빛 BOSS · 장 보스 금빛 · 미지의 항로 남보라) | 웨이브 칸 진행 막대 + 다음 보스 왕관), 보스는 적이 있는 오른쪽 위에 금테 · 장밋빛 띠 · 별이 든 기운 남보라 판(이름 · 남은 % · 시계 + 제한 시간 · 기운 체력 막대 25% 눈금). 판 · 막대는 새 셰이더(hud_b_plate · hud_b_voyage · hud_b_hp). 휴대폰은 카메라 구멍 여백만큼 안쪽으로. 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "boss_intro",
     "res": "1280x720",
     "label": "보스 등장 · 위쪽 스테이지/보스 UI",
     "before": [
      "img/before/boss_intro_f1_1280x720.jpg",
      "img/before/boss_intro_f2_1280x720.jpg",
      "img/before/boss_intro_f3_1280x720.jpg",
      "img/before/boss_intro_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/boss_intro_f1_1280x720.jpg",
      "img/after/boss_intro_f2_1280x720.jpg",
      "img/after/boss_intro_f3_1280x720.jpg",
      "img/after/boss_intro_f4_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1280x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1600x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "stage_clear_transition",
     "res": "1280x720",
     "label": "스테이지 정화(CLEAR) → 항해 → 다음 STAGE 띠",
     "before": [
      "img/before/stage_clear_transition_f1_1280x720.jpg",
      "img/before/stage_clear_transition_f2_1280x720.jpg",
      "img/before/stage_clear_transition_f3_1280x720.jpg",
      "img/before/stage_clear_transition_f4_1280x720.jpg",
      "img/before/stage_clear_transition_f5_1280x720.jpg",
      "img/before/stage_clear_transition_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/stage_clear_transition_f1_1280x720.jpg",
      "img/after/stage_clear_transition_f2_1280x720.jpg",
      "img/after/stage_clear_transition_f3_1280x720.jpg",
      "img/after/stage_clear_transition_f4_1280x720.jpg",
      "img/after/stage_clear_transition_f5_1280x720.jpg",
      "img/after/stage_clear_transition_f6_1280x720.jpg"
     ]
    },
    {
     "id": "tut_boss",
     "res": "1280x720",
     "label": "안내 · 보스",
     "before": [
      "img/before/tut_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_boss_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 36,
   "title": "이야기 퀘스트 강제 장면",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "합류 보스(10칸 미오 등)를 정화해도 이야기 장면이 저절로 열리지 않음: 전투는 다음 칸으로 이어지고 「이야기」가 반짝이며 위에 「○○의 이야기가 열렸어요」 알림. 누를 때만 장면, 다 보면 합류",
   "novisual": "",
   "caps": [
    {
     "id": "story_auto_scene",
     "res": "1280x720",
     "label": "이야기 장면 (강제 재생)",
     "before": [
      "img/before/story_auto_scene_f1_1280x720.jpg",
      "img/before/story_auto_scene_f2_1280x720.jpg",
      "img/before/story_auto_scene_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/story_auto_scene_f1_1280x720.jpg",
      "img/after/story_auto_scene_f2_1280x720.jpg",
      "img/after/story_auto_scene_f3_1280x720.jpg"
     ]
    },
    {
     "id": "story_menu",
     "res": "1280x720",
     "label": "이야기 목록",
     "before": [
      "img/before/story_menu_1280x720.jpg"
     ],
     "after": [
      "img/after/story_menu_1280x720.jpg"
     ]
    },
    {
     "id": "story_menu",
     "res": "1600x720",
     "label": "이야기 목록",
     "before": [
      "img/before/story_menu_1600x720.jpg"
     ],
     "after": [
      "img/after/story_menu_1600x720.jpg"
     ]
    },
    {
     "id": "tut_story",
     "res": "1280x720",
     "label": "안내 · 이야기",
     "before": [
      "img/before/tut_story_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_story_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 37,
   "title": "편성 화면 문구",
   "area": "편성",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "편성 화면을 시안 B(팀 라인업)로: 문장 대신 번호 1~4 · 「선두/후열」 꼬리표 · 전투력 숫자 · 결속은 딜러/수호/지원 마름모와 짧은 칩. 빈 칸 안내 문장 제거, 추천 이유만 작은 한 줄 (scripts/ui/formation_page.gd, 시안 대비 artifacts/feedback70/after/compare_formation_mockupB_vs_game.jpg)",
   "novisual": "",
   "caps": [
    {
     "id": "formation",
     "res": "1280x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_1280x720.jpg"
     ]
    },
    {
     "id": "formation",
     "res": "1600x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_1600x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1280x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1280x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1600x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1600x720.jpg"
     ]
    },
    {
     "id": "formation_pick",
     "res": "1280x720",
     "label": "편성 · 아이를 고른 상태",
     "before": [],
     "after": [
      "img/after/formation_pick_1280x720.jpg"
     ]
    },
    {
     "id": "formation_pick",
     "res": "1600x720",
     "label": "편성 · 아이를 고른 상태",
     "before": [],
     "after": [
      "img/after/formation_pick_1600x720.jpg"
     ]
    },
    {
     "id": "tut_formation",
     "res": "1280x720",
     "label": "안내 · 편성",
     "before": [
      "img/before/tut_formation_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_formation_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 38,
   "title": "편성 UI 재사용",
   "area": "편성",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "다른 메뉴와 다른 생김새: 밤 라벤더 무대 + 금빛 조명 셰이더(lineup_stage), 기울어진 세로 카드 셰이더(lineup_card: 선두 금테 · 후열 흰테 · SS 속성색 · 신화 무지개), 왼쪽 세로 기울어진 덱 탭, 크림 정보 카드 · 알약 버튼. 1280/1600 모두 판 안 · 아이 그림은 공용 초상화 규칙(portrait.gd: 얼굴 가운데 · 같은 얼굴 크기)으로 늘이지 않고 잘라 넣음, 아래 줄 카드 118×170 · 등급 태그 GradeStyle (전후: artifacts/feedback70/portrait_strip/bottom_row_before_after.jpg). QA 재검 반영: 아이를 고른 채 뒤로/Esc → 고른 것만 풀림 (도움말 ? → 정보 창 → 고른 아이 → 화면 순, back_button_check 회귀 검사), 밝은 카드 위 신화 이름은 진한 무지개 + 굵은 외곽선 (artifacts/feedback70/after/mythic_name_contrast_before_after.png)",
   "novisual": "",
   "caps": [
    {
     "id": "formation",
     "res": "1280x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_1280x720.jpg"
     ]
    },
    {
     "id": "formation",
     "res": "1600x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_1600x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1280x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1280x720.jpg"
     ]
    },
    {
     "id": "formation_after_join",
     "res": "1600x720",
     "label": "합류 직후 편성 화면",
     "before": [
      "img/before/formation_after_join_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_after_join_1600x720.jpg"
     ]
    },
    {
     "id": "formation_arena_atk",
     "res": "1280x720",
     "label": "편성 · 등급전 공격 덱",
     "before": [
      "img/before/formation_arena_atk_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_arena_atk_1280x720.jpg"
     ]
    },
    {
     "id": "formation_arena_atk",
     "res": "1600x720",
     "label": "편성 · 등급전 공격 덱",
     "before": [
      "img/before/formation_arena_atk_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_arena_atk_1600x720.jpg"
     ]
    },
    {
     "id": "formation_arena_def",
     "res": "1280x720",
     "label": "편성 · 등급전 방어 덱",
     "before": [
      "img/before/formation_arena_def_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "formation_arena_def",
     "res": "1600x720",
     "label": "편성 · 등급전 방어 덱",
     "before": [
      "img/before/formation_arena_def_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "formation_pick",
     "res": "1280x720",
     "label": "편성 · 아이를 고른 상태",
     "before": [],
     "after": [
      "img/after/formation_pick_1280x720.jpg"
     ]
    },
    {
     "id": "formation_pick",
     "res": "1600x720",
     "label": "편성 · 아이를 고른 상태",
     "before": [],
     "after": [
      "img/after/formation_pick_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 39,
   "title": "소환 탭: 출석부 버튼 · 다른 소환",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "summon_pickup",
     "res": "1280x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1280x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1600x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1600x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1280x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1280x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1600x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1600x720.jpg"
     ]
    },
    {
     "id": "tut_summon",
     "res": "1280x720",
     "label": "안내 · 소환 (채색석 1600)",
     "before": [
      "img/before/tut_summon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_summon_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 40,
   "title": "소환 배너 그림",
   "area": "소환",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "summon_pickup",
     "res": "1280x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1280x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1600x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1600x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1280x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1280x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1600x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 41,
   "title": "고래 보호막 UI 위치",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "보호막을 고래 아래 굵은 막대로(scripts/hud_shield_bar.gd): 초록 방패 구슬 + 16px 막대(벌집 결 · 출렁이는 앞머리 · 10% 눈금) + 「고래 보호막」과 남은/최대를 흰 글자로 크게. 반 아래 귤빛 · 1/4 아래 빨강, 누르면 고래 강화. 안내 말풍선이 막대를 덮지 않게 올림(first_session_check 통과). 시안 대비: artifacts/feedback70/after/mockup_b_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "menu_whale",
     "res": "1280x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1280x720.jpg"
     ]
    },
    {
     "id": "menu_whale",
     "res": "1600x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "shield_hit",
     "res": "1280x720",
     "label": "고래 보호막 피격 · 낮은 보호막",
     "before": [
      "img/before/shield_hit_f1_1280x720.jpg",
      "img/before/shield_hit_f2_1280x720.jpg",
      "img/before/shield_hit_f3_1280x720.jpg",
      "img/before/shield_hit_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/shield_hit_f1_1280x720.jpg",
      "img/after/shield_hit_f2_1280x720.jpg",
      "img/after/shield_hit_f3_1280x720.jpg",
      "img/after/shield_hit_f4_1280x720.jpg"
     ]
    },
    {
     "id": "tut_shield",
     "res": "1280x720",
     "label": "안내 · 보호막",
     "before": [
      "img/before/tut_shield_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_shield_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 42,
   "title": "보호막의 역할",
   "area": "전투·밸런스",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "menu_whale",
     "res": "1280x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1280x720.jpg"
     ]
    },
    {
     "id": "menu_whale",
     "res": "1600x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1600x720.jpg"
     ]
    },
    {
     "id": "shield_hit",
     "res": "1280x720",
     "label": "고래 보호막 피격 · 낮은 보호막",
     "before": [
      "img/before/shield_hit_f1_1280x720.jpg",
      "img/before/shield_hit_f2_1280x720.jpg",
      "img/before/shield_hit_f3_1280x720.jpg",
      "img/before/shield_hit_f4_1280x720.jpg"
     ],
     "after": [
      "img/after/shield_hit_f1_1280x720.jpg",
      "img/after/shield_hit_f2_1280x720.jpg",
      "img/after/shield_hit_f3_1280x720.jpg",
      "img/after/shield_hit_f4_1280x720.jpg"
     ]
    },
    {
     "id": "tut_shield",
     "res": "1280x720",
     "label": "안내 · 보호막",
     "before": [
      "img/before/tut_shield_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_shield_1280x720.jpg"
     ]
    },
    {
     "id": "tut_whale",
     "res": "1280x720",
     "label": "안내 · 고래 강화",
     "before": [
      "img/before/tut_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_whale_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 43,
   "title": "아이 상세 페이지",
   "area": "아이들·성장",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "시안 A(큰 그림 + 탭)로 새로 만듦(scripts/ui/hero_page.gd, Menus._hero_info에서 띄움): 왼쪽은 아이 그림이 화면의 주인공(컷인 그림, 없으면 공통 초상화 card 자르기), 이름 · 등급 · 속성 · 역할 · 별 · 각성만. 오른쪽 크림 판은 「능력 · 스킬 · 장비」 탭으로 나눠 한 번에 한 가지만 — 긴 설명 문장은 걷어 냄. 아래 레벨 업 · 승급 · 이야기 버튼. 성장 동그라미 배지, 좌우 화살표로 다음 아이. 등급 색 규칙: SS = 속성 색, 신화 = 무지개. 1280 · 1600 글자 넘침 자동 검사(tools/fb70_overflow_check.gd) 통과 · QA 2차 수정: 레벨 업 · 승급 때 큰 그림이 깜빡이던 것(다시 지을 때 페이드) 없앰 · 고유 능력 설명이 칸을 넘던 줄을 두 줄로 · 18자 이름도 칸 안 · 장비가 아직 안 열린 저장(항해사 Lv.6 전)은 장비 탭 · 장비 버튼 · 장비 칸에 자물쇠 + 잿빛, 누르면 해금 조건 안내 · 뒤로 가기는 한 겹씩(ⓘ → 작업대 → 아이 상세)",
   "novisual": "",
   "caps": [
    {
     "id": "hero_info",
     "res": "1280x720",
     "label": "아이 정보 (상세)",
     "before": [
      "img/before/hero_info_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_info_1280x720.jpg"
     ]
    },
    {
     "id": "hero_info",
     "res": "1600x720",
     "label": "아이 정보 (상세)",
     "before": [
      "img/before/hero_info_1600x720.jpg"
     ],
     "after": [
      "img/after/hero_info_1600x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1280x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1280x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1600x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1600x720.jpg"
     ]
    },
    {
     "id": "tut_info",
     "res": "1280x720",
     "label": "안내 · 아이 정보",
     "before": [
      "img/before/tut_info_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_info_1280x720.jpg"
     ]
    },
    {
     "id": "43_1",
     "res": "1280x720",
     "label": "시안 A vs 게임 (1280)",
     "before": [],
     "after": [
      "img/after/43_mockA_hero_vs_game_1280.jpg"
     ]
    },
    {
     "id": "43_2",
     "res": "1280x720",
     "label": "장비 잠김 상태 (1280)",
     "before": [],
     "after": [
      "img/after/43_hero_gear_locked_1280x720.png"
     ]
    }
   ]
  },
  {
   "n": 44,
   "title": "진주 레벨 업 안내 반복",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "진주 레벨 업 퀘스트: 「아이들」→「성장」→「레벨 업」을 4번 끝까지 짚고 「1/4」 표시, 다른 아이를 올려도 셈",
   "novisual": "",
   "caps": [
    {
     "id": "guide_growth_1",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (1)",
     "before": [],
     "after": [
      "img/after/guide_growth_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_2",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (2)",
     "before": [],
     "after": [
      "img/after/guide_growth_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_3",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (3)",
     "before": [],
     "after": [
      "img/after/guide_growth_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_4",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (4)",
     "before": [],
     "after": [
      "img/after/guide_growth_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_5",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (5)",
     "before": [],
     "after": [
      "img/after/guide_growth_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_6",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (6)",
     "before": [],
     "after": [
      "img/after/guide_growth_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_7",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (7)",
     "before": [],
     "after": [
      "img/after/guide_growth_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_growth_8",
     "res": "1280x720",
     "label": "손가락 안내 · 성장 (진주) (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_growth_8_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1280x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1600x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1600x720.jpg"
     ]
    },
    {
     "id": "menu_whale",
     "res": "1280x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1280x720.jpg"
     ]
    },
    {
     "id": "menu_whale",
     "res": "1600x720",
     "label": "고래 강화 (보호막)",
     "before": [
      "img/before/menu_whale_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_whale_1600x720.jpg"
     ]
    },
    {
     "id": "tut_growth",
     "res": "1280x720",
     "label": "안내 · 성장 (진주)",
     "before": [
      "img/before/tut_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_growth_1280x720.jpg"
     ]
    },
    {
     "id": "tut_whale",
     "res": "1280x720",
     "label": "안내 · 고래 강화",
     "before": [
      "img/before/tut_whale_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_whale_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 45,
   "title": "성장 레벨 업 연출이 넘침",
   "area": "아이들·성장",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "레벨 업 연출을 새로(scripts/ui/level_burst.gd): 글자가 판 밖으로 나가던 예전 떠오르는 문구 대신, 버튼 자리에서 속성 색 빛 고리 + 작은 숫자 「+1」이 판 안에서만 피었다 사라짐(SS = 속성 결, 신화 = 무지개). 성장 줄 · 아이 상세 둘 다. 연타 · 일괄은 합쳐서 하나로(넘쳐 쌓이지 않음). 연출 도중 · 끝난 뒤 글자 넘침 자동 검사 통과 · QA 2차 수정: 레벨 업 때 아이 상세 그림이 다시 페이드되며 깜빡이던 것을 없앰(같은 아이를 다시 그리면 바로 보임 · 반짝이도 이어서). 키웠을 때 한마디(PD 승인): 그림 연출 없이 말풍선만. 꼬리를 몸통과 한 윤곽으로 고침(이음매 · 겹친 테두리 없이 한 번 채우고 그림자 한 번, 밑동은 둥글게 녹아들고 끝은 얼굴 쪽으로 기움 — 머리 옆 · 머리 위 · 반대쪽 세 자리 모두). 63명 모두 적용: 아이마다 레벨 업 3줄 · 승급 2줄(유나 3줄), 기존 대사 · 이야기 · 외형에 맞춘 말투, 신화는 제 설정대로 — 대사표 design/mockups/feedback70/hero_react/lines.html. 컷인 13명은 얼굴 칸을 그림마다 재고, SD 50명은 초상화 기준점의 머리 실루엣으로 피함. 자리는 얼굴 · 레벨 원 · ◀ ▶ · 크림 판을 피한 곳 중 줄 수가 적은 곳. 자동 검사: 63명 모든 줄 1280 · 1600에서 넘침 · 겹침 · 꼬리 방향 · 띄어쓰기 통과 — 검토 페이지 design/mockups/feedback70/hero_react",
   "novisual": "",
   "caps": [
    {
     "id": "growth_levelup_fx",
     "res": "1280x720",
     "label": "성장 레벨 업 연출",
     "before": [
      "img/before/growth_levelup_fx_f1_1280x720.jpg",
      "img/before/growth_levelup_fx_f2_1280x720.jpg",
      "img/before/growth_levelup_fx_f3_1280x720.jpg",
      "img/before/growth_levelup_fx_f4_1280x720.jpg",
      "img/before/growth_levelup_fx_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/growth_levelup_fx_f1_1280x720.jpg",
      "img/after/growth_levelup_fx_f2_1280x720.jpg",
      "img/after/growth_levelup_fx_f3_1280x720.jpg",
      "img/after/growth_levelup_fx_f4_1280x720.jpg",
      "img/after/growth_levelup_fx_f5_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1280x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1600x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1600x720.jpg"
     ]
    },
    {
     "id": "45_1",
     "res": "1280x720",
     "label": "성장 레벨 업 연출 띠 (전 / 후, 1280)",
     "before": [
      "img/before/45_levelup_strip_before_1280.jpg"
     ],
     "after": [
      "img/after/45_levelup_strip_after_1280.jpg"
     ]
    },
    {
     "id": "45_2",
     "res": "1280x720",
     "label": "꼬리 · 머리 옆 (전 / 후, 1280, 2배 확대)",
     "before": [
      "img/before/45_zoom_before_left_1280.png"
     ],
     "after": [
      "img/after/45_zoom_after_left_1280.png"
     ]
    },
    {
     "id": "45_3",
     "res": "1600x720",
     "label": "꼬리 · 머리 위 (전 / 후, 1600, 2배 확대)",
     "before": [
      "img/before/45_zoom_before_bottom_1600.png"
     ],
     "after": [
      "img/after/45_zoom_after_bottom_1600.png"
     ]
    },
    {
     "id": "45_4",
     "res": "1280x720",
     "label": "꼬리 · 반대쪽 (전 / 후, 1280, 2배 확대)",
     "before": [
      "img/before/45_zoom_before_right_1280.png"
     ],
     "after": [
      "img/after/45_zoom_after_right_1280.png"
     ]
    },
    {
     "id": "45_5",
     "res": "1600x720",
     "label": "한마디 · 이그니 SS 레벨 업 (1600)",
     "before": [],
     "after": [
      "img/after/45_ignis_level_1600.jpg"
     ]
    },
    {
     "id": "45_6",
     "res": "1280x720",
     "label": "한마디 · 아르카 신화 승급 (1280)",
     "before": [],
     "after": [
      "img/after/45_arca_star_1280.jpg"
     ]
    },
    {
     "id": "45_7",
     "res": "1600x720",
     "label": "한마디 · 세나 SD 레벨 업 (1600)",
     "before": [],
     "after": [
      "img/after/45_sena_level_1600.jpg"
     ]
    }
   ]
  },
  {
   "n": 46,
   "title": "가짜 빨간 점",
   "area": "UI 공통",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "빨간 점 전수 점검: 소환은 채색석만 많을 때 끔(무료 · 뽑기권 · 기억 포인트만), 아이들은 「성장」 열리기 전 성장 재료 점 끔(도감 보상은 유지), 이야기는 안 본 이야기만(story_new 플래그 삭제), 편성은 빈 칸+대기 아이, 색 지도는 안 본 복원 장면",
   "novisual": "",
   "caps": [
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 47,
   "title": "분교 퀘스트 강제 장면",
   "area": "가이드",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "분교가 열리는 시엘 합류 이야기도 같은 방식(누를 때만). 분교 교실·연구 완성은 가운데 띠 대신 「분교」 반짝임 + 위쪽 알림, 분교를 열면 반짝임 꺼짐",
   "novisual": "",
   "caps": [
    {
     "id": "menu_school",
     "res": "1280x720",
     "label": "분교",
     "before": [
      "img/before/menu_school_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_school_1280x720.jpg"
     ]
    },
    {
     "id": "menu_school",
     "res": "1600x720",
     "label": "분교",
     "before": [
      "img/before/menu_school_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_school_1600x720.jpg"
     ]
    },
    {
     "id": "school_done",
     "res": "1280x720",
     "label": "분교 교실 완성 알림",
     "before": [],
     "after": [
      "img/after/school_done_f1_1280x720.jpg",
      "img/after/school_done_f2_1280x720.jpg"
     ]
    },
    {
     "id": "story_auto_scene",
     "res": "1280x720",
     "label": "이야기 장면 (강제 재생)",
     "before": [
      "img/before/story_auto_scene_f1_1280x720.jpg",
      "img/before/story_auto_scene_f2_1280x720.jpg",
      "img/before/story_auto_scene_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/story_auto_scene_f1_1280x720.jpg",
      "img/after/story_auto_scene_f2_1280x720.jpg",
      "img/after/story_auto_scene_f3_1280x720.jpg"
     ]
    },
    {
     "id": "tut_build",
     "res": "1280x720",
     "label": "안내 · 분교 과학실",
     "before": [
      "img/before/tut_build_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_build_1280x720.jpg"
     ]
    },
    {
     "id": "tut_study",
     "res": "1280x720",
     "label": "안내 · 색의 공명 연구",
     "before": [
      "img/before/tut_study_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_study_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 48,
   "title": "이야기 영구 능력치 상승 연출 UI",
   "area": "색 지도",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "시안 나 「장소 완성 카드 (전 → 후)」(scripts/ui/place_card.gd + assets/ui/fx/place_card.gdshader): 다 칠한 장소의 복원 장면 → 이야기가 끝나면 어두워진 장소 그림 위로 금테 카드가 아래에서 튀어 올라옴. 위 띠 = 장소 그림(잿빛에서 붓질처럼 색이 돌아옴) + 「벚꽃 선착장 100%」 + 「영구 보너스」 리본, 가운데 = 보너스 그림 + 「복귀할 때 받는 구름 진주」 + 「+0% → +5%」(후 숫자가 톡 튀고 분홍 빛이 숨 쉼, 같은 종류 장소 합 전/후), 아래 세 칸 = 실제로 함께 얻은 것(군도 색 n/5 · 항해사 EXP +50(Lv.8부터, 그 전엔 다음 장소) · 그 장소 아이의 한마디). 누르기·뒤로 가기·8초 뒤 닫힘. 전/후: before·after/place_card(띠 + 1600), 시안 대비 artifacts/feedback70/after/rewards_compare/48_place_card_mockup_vs_game_1280x720.jpg · _1600x720.jpg",
   "novisual": "",
   "caps": [
    {
     "id": "color_restore",
     "res": "1280x720",
     "label": "색 지도 열기 → 다 칠한 곳 복원 장면 · 영구 보너스",
     "before": [
      "img/before/color_restore_f1_1280x720.jpg",
      "img/before/color_restore_f2_1280x720.jpg",
      "img/before/color_restore_f3_1280x720.jpg",
      "img/before/color_restore_f4_1280x720.jpg",
      "img/before/color_restore_f5_1280x720.jpg",
      "img/before/color_restore_f6_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "place_card",
     "res": "1280x720",
     "label": "장소 이야기를 다 본 뒤 (영구 보너스)",
     "before": [
      "img/before/place_card_f1_1280x720.jpg",
      "img/before/place_card_f2_1280x720.jpg",
      "img/before/place_card_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/place_card_f1_1280x720.jpg",
      "img/after/place_card_f2_1280x720.jpg",
      "img/after/place_card_f3_1280x720.jpg"
     ]
    },
    {
     "id": "place_card",
     "res": "1600x720",
     "label": "장소 이야기를 다 본 뒤 (영구 보너스)",
     "before": [
      "img/before/place_card_1600x720.jpg"
     ],
     "after": [
      "img/after/place_card_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 49,
   "title": "의뢰 없애기",
   "area": "전투 HUD",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "requests_panel",
     "res": "1280x720",
     "label": "섬 주민 의뢰 창",
     "before": [
      "img/before/requests_panel_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "requests_panel",
     "res": "1600x720",
     "label": "섬 주민 의뢰 창",
     "before": [
      "img/before/requests_panel_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 50,
   "title": "복귀 버튼 옮기기",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "복귀 버튼을 오른쪽 아래 예전 배속 자리(순풍 옆 · 자동 위)로, 왼쪽 위 갑판 줄에서 뺌. 잠김 「항해사 Lv.4 필요」가 버튼 폭 안에 들어감 (QA L1, release_ui_check 회귀 검사) · UI(시안 B): 조작 줄을 순풍(위, 넓게) + 복귀 · 자동(아래)으로 바꾸고 복귀는 100px 그대로라 「항해사 Lv.4 필요」 한 줄 유지",
   "novisual": "",
   "caps": [
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    },
    {
     "id": "return_ask",
     "res": "1280x720",
     "label": "복귀 확인 창",
     "before": [
      "img/before/return_ask_1280x720.jpg"
     ],
     "after": [
      "img/after/return_ask_1280x720.jpg"
     ]
    },
    {
     "id": "return_ask",
     "res": "1600x720",
     "label": "복귀 확인 창",
     "before": [
      "img/before/return_ask_1600x720.jpg"
     ],
     "after": [
      "img/after/return_ask_1600x720.jpg"
     ]
    },
    {
     "id": "return_cutscene",
     "res": "1280x720",
     "label": "복귀 연출",
     "before": [
      "img/before/return_cutscene_f1_1280x720.jpg",
      "img/before/return_cutscene_f2_1280x720.jpg",
      "img/before/return_cutscene_f3_1280x720.jpg",
      "img/before/return_cutscene_f4_1280x720.jpg",
      "img/before/return_cutscene_f5_1280x720.jpg",
      "img/before/return_cutscene_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/return_cutscene_f1_1280x720.jpg",
      "img/after/return_cutscene_f2_1280x720.jpg",
      "img/after/return_cutscene_f3_1280x720.jpg",
      "img/after/return_cutscene_f4_1280x720.jpg",
      "img/after/return_cutscene_f5_1280x720.jpg",
      "img/after/return_cutscene_f6_1280x720.jpg"
     ]
    },
    {
     "id": "tut_return",
     "res": "1280x720",
     "label": "안내 · 복귀",
     "before": [
      "img/before/tut_return_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_return_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 51,
   "title": "장비 안내",
   "area": "장비",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "장비 퀘스트: 별빛 장비 네 부위 지급 → 아이들 → 장비 → 카렌 → 빈 부위 → 장비 → 장착을 네 부위 끝까지 짚음(「2/4」), 작업대가 떠 있으면 ✕부터 짚음 · 잠재 덧칠도 같은 방식",
   "novisual": "",
   "caps": [
    {
     "id": "gear_detail",
     "res": "1280x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1280x720.jpg"
     ]
    },
    {
     "id": "gear_detail",
     "res": "1600x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1600x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1280x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1280x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1600x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1600x720.jpg"
     ]
    },
    {
     "id": "guide_equip_1",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (1)",
     "before": [],
     "after": [
      "img/after/guide_equip_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_10",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (10)",
     "before": [],
     "after": [
      "img/after/guide_equip_10_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_11",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (11)",
     "before": [],
     "after": [
      "img/after/guide_equip_11_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_12",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (12)",
     "before": [],
     "after": [
      "img/after/guide_equip_12_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_13",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (13)",
     "before": [],
     "after": [
      "img/after/guide_equip_13_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_14",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (14)",
     "before": [],
     "after": [
      "img/after/guide_equip_14_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_15",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (15)",
     "before": [],
     "after": [
      "img/after/guide_equip_15_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_16",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (16)",
     "before": [],
     "after": [
      "img/after/guide_equip_16_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_17",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (17)",
     "before": [],
     "after": [
      "img/after/guide_equip_17_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_18",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (18)",
     "before": [],
     "after": [
      "img/after/guide_equip_18_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_19",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (19)",
     "before": [],
     "after": [
      "img/after/guide_equip_19_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_2",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (2)",
     "before": [],
     "after": [
      "img/after/guide_equip_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_20",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (20) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_equip_20_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_3",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (3)",
     "before": [],
     "after": [
      "img/after/guide_equip_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_4",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (4)",
     "before": [],
     "after": [
      "img/after/guide_equip_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_5",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (5)",
     "before": [],
     "after": [
      "img/after/guide_equip_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_6",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (6)",
     "before": [],
     "after": [
      "img/after/guide_equip_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_7",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (7)",
     "before": [],
     "after": [
      "img/after/guide_equip_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_8",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (8)",
     "before": [],
     "after": [
      "img/after/guide_equip_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_equip_9",
     "res": "1280x720",
     "label": "손가락 안내 · 장비 끼우기 (9)",
     "before": [],
     "after": [
      "img/after/guide_equip_9_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_1",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (1)",
     "before": [],
     "after": [
      "img/after/guide_repaint_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_2",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (2)",
     "before": [],
     "after": [
      "img/after/guide_repaint_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_3",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (3)",
     "before": [],
     "after": [
      "img/after/guide_repaint_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_4",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (4)",
     "before": [],
     "after": [
      "img/after/guide_repaint_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_5",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (5)",
     "before": [],
     "after": [
      "img/after/guide_repaint_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_6",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (6)",
     "before": [],
     "after": [
      "img/after/guide_repaint_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_7",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (7)",
     "before": [],
     "after": [
      "img/after/guide_repaint_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_repaint_8",
     "res": "1280x720",
     "label": "손가락 안내 · 잠재 덧칠 (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_repaint_8_1280x720.jpg"
     ]
    },
    {
     "id": "tut_equip",
     "res": "1280x720",
     "label": "안내 · 장비 끼우기",
     "before": [
      "img/before/tut_equip_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_equip_1280x720.jpg"
     ]
    },
    {
     "id": "tut_repaint",
     "res": "1280x720",
     "label": "안내 · 잠재 덧칠",
     "before": [
      "img/before/tut_repaint_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_repaint_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 52,
   "title": "장비 ? / i 도움말",
   "area": "장비",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "버튼마다 옆에 ⓘ: 강화 · 잠재 · 잠재 덧칠 · 무지개 덧칠 · 장비 합치기. 누르면 그 버튼 옆에 짧은 말풍선(두세 줄, 예: 「무지개 덧칠 · 채색석으로 3줄을 다시 칠해요. 최대 2줄 잠금…」), 다시 누르거나 다른 ⓘ를 누르면 바뀜/닫힘 · QA 2차 수정: ⓘ 글을 scripts/gear.gd 규칙과 맞춤 — 잠재 덧칠 · 무지개 덧칠은 장비 등급의 상한(희귀 = 보랏빛, 영웅 = 금빛, 전설 · 신화 = 무지개) 아래일 때만 등급이 오르고, 끝 등급이면 「더 오르지 않아요」 · 신화 승격 재료 = 같은 부위 전설 · 장착 안 함 · 강화 0 · 은빛 잠재 · 천장 0 · 잠금 줄 위에 누르는 ⓘ 추가(폰은 손가락 올리기가 안 됨) · 잠근 줄이 있으면 잠재 덧칠 버튼에 「잠금을 풀면 쓸 수 있어요」 · 뒤로 가기는 ⓘ부터 닫고, 메뉴를 다시 열면 ⓘ는 닫힌 채",
   "novisual": "",
   "caps": [
    {
     "id": "gear_detail",
     "res": "1280x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1280x720.jpg"
     ]
    },
    {
     "id": "gear_detail",
     "res": "1600x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1600x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1280x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1280x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1600x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1600x720.jpg"
     ]
    },
    {
     "id": "gear_rainbow",
     "res": "1280x720",
     "label": "장비 상세 · 잠금 + 무지개 덧칠",
     "before": [
      "img/before/gear_rainbow_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_rainbow_1280x720.jpg"
     ]
    },
    {
     "id": "gear_rainbow",
     "res": "1600x720",
     "label": "장비 상세 · 잠금 + 무지개 덧칠",
     "before": [
      "img/before/gear_rainbow_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_rainbow_1600x720.jpg"
     ]
    },
    {
     "id": "gear_repaint_result",
     "res": "1280x720",
     "label": "잠재 덧칠 누른 뒤",
     "before": [
      "img/before/gear_repaint_result_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_repaint_result_1280x720.jpg"
     ]
    },
    {
     "id": "52_1",
     "res": "1280x720",
     "label": "ⓘ 말풍선 (1280)",
     "before": [],
     "after": [
      "img/after/52_gear_bench_help_1280x720.png"
     ]
    }
   ]
  },
  {
   "n": 53,
   "title": "장비 문구",
   "area": "장비",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "장비 상세를 시안 A(공방 작업대)로 새로(scripts/ui/gear_bench.gd, Menus._gear_detail에서): 가운데 장비 하나가 주인공(빛 받침 · 주능력), 왼쪽 「강화 · 세트」, 오른쪽 「잠재 + 덧칠」 판. 긴 규칙 문장은 모두 걷어 내고 버튼 · 숫자만 남김(규칙은 ⓘ로). 동작 · 비용 · 확률은 그대로(gear_growth_check 341 통과) · QA 2차 수정: 18자 이름도 장비 목록 · 가운데 제목 · 「…에게 장착」 버튼 · 「… 장착 중」 꼬리표 안에(글자를 줄이고, 그래도 길면 이름 끝을 「…」로 — 뒷말은 늘 보임) · 작업대 가운데 칸을 두 카드 사이 가운데로 다시 계산(부적 주능력 글이 오른쪽 카드 밑으로 들어가던 것 고침)",
   "novisual": "",
   "caps": [
    {
     "id": "gear_detail",
     "res": "1280x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1280x720.jpg"
     ]
    },
    {
     "id": "gear_detail",
     "res": "1600x720",
     "label": "장비 상세 · 잠재 덧칠",
     "before": [
      "img/before/gear_detail_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_detail_1600x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1280x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1280x720.jpg"
     ]
    },
    {
     "id": "gear_list",
     "res": "1600x720",
     "label": "장비 (가방 · 착용)",
     "before": [
      "img/before/gear_list_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_list_1600x720.jpg"
     ]
    },
    {
     "id": "gear_rainbow",
     "res": "1280x720",
     "label": "장비 상세 · 잠금 + 무지개 덧칠",
     "before": [
      "img/before/gear_rainbow_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_rainbow_1280x720.jpg"
     ]
    },
    {
     "id": "gear_rainbow",
     "res": "1600x720",
     "label": "장비 상세 · 잠금 + 무지개 덧칠",
     "before": [
      "img/before/gear_rainbow_1600x720.jpg"
     ],
     "after": [
      "img/after/gear_rainbow_1600x720.jpg"
     ]
    },
    {
     "id": "gear_repaint_result",
     "res": "1280x720",
     "label": "잠재 덧칠 누른 뒤",
     "before": [
      "img/before/gear_repaint_result_1280x720.jpg"
     ],
     "after": [
      "img/after/gear_repaint_result_1280x720.jpg"
     ]
    },
    {
     "id": "53_1",
     "res": "1280x720",
     "label": "시안 A vs 게임 (1280)",
     "before": [],
     "after": [
      "img/after/53_mockA_gear_vs_game_1280.jpg"
     ]
    },
    {
     "id": "53_2",
     "res": "1280x720",
     "label": "긴 이름 · 작업대 (1280)",
     "before": [],
     "after": [
      "img/after/53_gear_bench_long_1280x720.png"
     ]
    },
    {
     "id": "53_3",
     "res": "1600x720",
     "label": "긴 이름 · 장비 목록 (1600)",
     "before": [],
     "after": [
      "img/after/53_gear_list_long_1600x720.png"
     ]
    },
    {
     "id": "53_4",
     "res": "1280x720",
     "label": "부적 주능력 (1280)",
     "before": [],
     "after": [
      "img/after/53_gear_bench_charm_1280x720.png"
     ]
    }
   ]
  },
  {
   "n": 54,
   "title": "모험 콘텐츠별 안내",
   "area": "모험",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "모험 콘텐츠마다 첫 도전 퀘스트(회랑 · 원소 구름섬 · 잿빛성 · 신전 · 등급전): 모험 → 그 콘텐츠 열기 → 도전/입장까지 짚음",
   "novisual": "",
   "caps": [
    {
     "id": "adv_castle",
     "res": "1280x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1600x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1280x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1600x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1280x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1600x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1280x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1600x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1280x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1600x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1280x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1600x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "guide_arena_1",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (1)",
     "before": [],
     "after": [
      "img/after/guide_arena_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_2",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (2)",
     "before": [],
     "after": [
      "img/after/guide_arena_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_3",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (3)",
     "before": [],
     "after": [
      "img/after/guide_arena_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_4",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (4)",
     "before": [],
     "after": [
      "img/after/guide_arena_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_5",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_arena_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_1",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (1)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_2",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (2)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_3",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (3)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_4",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_dungeon_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_1",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (1)",
     "before": [],
     "after": [
      "img/after/guide_element_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_2",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (2)",
     "before": [],
     "after": [
      "img/after/guide_element_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_3",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (3)",
     "before": [],
     "after": [
      "img/after/guide_element_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_1",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (1)",
     "before": [],
     "after": [
      "img/after/guide_temple_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_2",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (2)",
     "before": [],
     "after": [
      "img/after/guide_temple_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_3",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (3)",
     "before": [],
     "after": [
      "img/after/guide_temple_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_1",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (1)",
     "before": [],
     "after": [
      "img/after/guide_tower_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_2",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (2)",
     "before": [],
     "after": [
      "img/after/guide_tower_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_3",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (3)",
     "before": [],
     "after": [
      "img/after/guide_tower_3_1280x720.jpg"
     ]
    },
    {
     "id": "tut_dungeon",
     "res": "1280x720",
     "label": "안내 · 모험 · 회랑",
     "before": [
      "img/before/tut_dungeon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_dungeon_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 55,
   "title": "AI 같은 배경 그림",
   "area": "모험",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_battle_element",
     "res": "1280x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_element",
     "res": "1600x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1280x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1600x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1280x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1600x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1280x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1600x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1280x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1600x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1280x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1600x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1280x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1600x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 56,
   "title": "모험 UI 겹침 · 도움말",
   "area": "모험",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_battle_element",
     "res": "1280x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_element",
     "res": "1600x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1280x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1600x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1280x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1600x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1280x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1600x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1280x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1600x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1280x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1600x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1280x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1600x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 57,
   "title": "보스 막대: 맞을 때마다 노란 지연",
   "area": "전투 HUD",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "노란 잔상을 맞은 번마다 조각으로: 조각마다 0.45초 그대로 보인 뒤 차례로 줄어듦 — 연타에도 끝없이 자라지 않고 큰 한 방은 크게 남음 (tools/boss_lag_check.gd 6/6) · UI: 시안 B 보스 판의 기운 막대(hud_b_hp)가 같은 노란 조각을 그대로 그림 (빨강 = 지금, 노랑 = 방금 깎인 몫)",
   "novisual": "",
   "caps": [
    {
     "id": "boss_rapid_hits",
     "res": "1280x720",
     "label": "보스 체력 막대 · 연타 (노란 지연 막대)",
     "before": [
      "img/before/boss_rapid_hits_f1_1280x720.jpg",
      "img/before/boss_rapid_hits_f2_1280x720.jpg",
      "img/before/boss_rapid_hits_f3_1280x720.jpg",
      "img/before/boss_rapid_hits_f4_1280x720.jpg",
      "img/before/boss_rapid_hits_f5_1280x720.jpg",
      "img/before/boss_rapid_hits_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/boss_rapid_hits_f1_1280x720.jpg",
      "img/after/boss_rapid_hits_f2_1280x720.jpg",
      "img/after/boss_rapid_hits_f3_1280x720.jpg",
      "img/after/boss_rapid_hits_f4_1280x720.jpg",
      "img/after/boss_rapid_hits_f5_1280x720.jpg",
      "img/after/boss_rapid_hits_f6_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1280x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1280x720.jpg"
     ]
    },
    {
     "id": "hud_boss",
     "res": "1600x720",
     "label": "보스 스테이지 HUD (보스 체력 막대)",
     "before": [
      "img/before/hud_boss_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_boss_1600x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1280x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1280x720.jpg"
     ]
    },
    {
     "id": "mockup_b_vs_game",
     "res": "1600x720",
     "label": "시안 B ↔ 실제 게임 (왼쪽 시안 · 오른쪽 게임, 위 일반 · 아래 보스)",
     "before": [],
     "after": [
      "img/after/mockup_b_vs_game_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 58,
   "title": "보상 아이템 눌러서 보기",
   "area": "퀘스트·보상",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_element_reward",
     "res": "1280x720",
     "label": "원소섬 보상 팝업",
     "before": [
      "img/before/adv_element_reward_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "fresh_reward_1",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [
      "img/before/fresh_reward_1_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_1_1280x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_1",
     "res": "1600x720",
     "label": "보상 팝업 (첫 세션 1) · 출석 보상",
     "before": [],
     "after": [
      "img/after/fresh_reward_1_1600x720.jpg"
     ]
    },
    {
     "id": "fresh_reward_2",
     "res": "1280x720",
     "label": "보상 팝업 (첫 세션 2) · 퀘스트 완료!",
     "before": [
      "img/before/fresh_reward_2_1280x720.jpg"
     ],
     "after": [
      "img/after/fresh_reward_2_1280x720.jpg"
     ]
    },
    {
     "id": "quest_reward_popup",
     "res": "1280x720",
     "label": "퀘스트 보상 팝업 (경험치 포함)",
     "before": [
      "img/before/quest_reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_reward_popup_1280x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1280x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1280x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1600x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1600x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1600x720.jpg"
     ]
    },
    {
     "id": "start_popup_1",
     "res": "1280x720",
     "label": "접속 보상 팝업 1 · 출석 보상",
     "before": [
      "img/before/start_popup_1_1280x720.jpg"
     ],
     "after": [
      "img/after/start_popup_1_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 59,
   "title": "승급 UI 어긋남",
   "area": "아이들·성장",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "승급 확인을 시안 2(카드 진화 전 → 후)로(scripts/ui/star_confirm.gd): 왼쪽 지금 카드(흐림) → 오른쪽 승급 후 카드(빛 테), 가운데 「공격 +% · 상한 A → B」, 아래 큰 「승급하기」 한 버튼. 카드 · 글자 자리는 고정 칸에 맞춰 계산 — 어긋남/넘침을 자동 검사(1280 · 1600, 단계마다)로 막음. 성장 줄의 승급 버튼 높이도 다른 버튼과 맞춤 · QA 2차 수정: 카드 별 줄이 오른쪽으로 밀리던 것(별 4개 +20px · 6개 +29px)을 띠 폭 가운데 정렬로 고침 — 별 수 · 등급(A · S · SS · 신화) · 승급/각성마다 ±0.5px 안 자동 검사 · 창이 열린 채 화면 크기가 바뀌면(1280 ↔ 1600) 닫히지 않고 새 크기에 맞춰 다시 놓임 · 긴 이름 제목도 칸 안",
   "novisual": "",
   "caps": [
    {
     "id": "menu_growth",
     "res": "1280x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1600x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1600x720.jpg"
     ]
    },
    {
     "id": "star_up_card",
     "res": "1280x720",
     "label": "승급 확인 카드",
     "before": [
      "img/before/star_up_card_1280x720.jpg"
     ],
     "after": [
      "img/after/star_up_card_1280x720.jpg"
     ]
    },
    {
     "id": "star_up_card",
     "res": "1600x720",
     "label": "승급 확인 카드",
     "before": [
      "img/before/star_up_card_1600x720.jpg"
     ],
     "after": [
      "img/after/star_up_card_1600x720.jpg"
     ]
    },
    {
     "id": "star_up_fx",
     "res": "1280x720",
     "label": "승급 연출",
     "before": [
      "img/before/star_up_fx_f1_1280x720.jpg",
      "img/before/star_up_fx_f2_1280x720.jpg",
      "img/before/star_up_fx_f3_1280x720.jpg",
      "img/before/star_up_fx_f4_1280x720.jpg",
      "img/before/star_up_fx_f5_1280x720.jpg",
      "img/before/star_up_fx_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/star_up_fx_f1_1280x720.jpg",
      "img/after/star_up_fx_f2_1280x720.jpg",
      "img/after/star_up_fx_f3_1280x720.jpg",
      "img/after/star_up_fx_f4_1280x720.jpg",
      "img/after/star_up_fx_f5_1280x720.jpg",
      "img/after/star_up_fx_f6_1280x720.jpg"
     ]
    },
    {
     "id": "tut_star",
     "res": "1280x720",
     "label": "안내 · 승급",
     "before": [
      "img/before/tut_star_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_star_1280x720.jpg"
     ]
    },
    {
     "id": "59_1",
     "res": "1280x720",
     "label": "시안 2 vs 게임 (1280)",
     "before": [],
     "after": [
      "img/after/59_mock2_star_vs_game_1280.jpg"
     ]
    },
    {
     "id": "59_2",
     "res": "1280x720",
     "label": "승급 확인 (1280)",
     "before": [],
     "after": [
      "img/after/59_star_confirm_ok_1280x720.png"
     ]
    },
    {
     "id": "59_3",
     "res": "1600x720",
     "label": "각성 확인 (1600)",
     "before": [],
     "after": [
      "img/after/59_star_confirm_awaken_1600x720.png"
     ]
    }
   ]
  },
  {
   "n": 60,
   "title": "등급전 덱 하나로",
   "area": "모험",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "등급전 공격·방어 덱을 「등급전 덱」 하나로 (Decks.KEYS · 추천 · 등급전 페이지). 예전 저장: 공격 덱 유지, 비었으면 방어 덱을 이어받음 (deck_recommend_check 회귀 검사). 예전 저장의 본 탭 목록에 남은 arena_def도 지움. 상대 셋 중 하나 골라 도전은 그대로",
   "novisual": "",
   "caps": [
    {
     "id": "adv_rank",
     "res": "1280x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_rank",
     "res": "1600x720",
     "label": "모험 · 항해사 등급전 페이지",
     "before": [
      "img/before/adv_rank_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "formation_arena_atk",
     "res": "1280x720",
     "label": "편성 · 등급전 공격 덱",
     "before": [
      "img/before/formation_arena_atk_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_arena_atk_1280x720.jpg"
     ]
    },
    {
     "id": "formation_arena_atk",
     "res": "1600x720",
     "label": "편성 · 등급전 공격 덱",
     "before": [
      "img/before/formation_arena_atk_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_arena_atk_1600x720.jpg"
     ]
    },
    {
     "id": "formation_arena_def",
     "res": "1280x720",
     "label": "편성 · 등급전 방어 덱",
     "before": [
      "img/before/formation_arena_def_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "formation_arena_def",
     "res": "1600x720",
     "label": "편성 · 등급전 방어 덱",
     "before": [
      "img/before/formation_arena_def_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "tut_arena",
     "res": "1280x720",
     "label": "안내 · 등급전",
     "before": [
      "img/before/tut_arena_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_arena_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 61,
   "title": "모험 중 잠긴 숨결 · 순풍 UI",
   "area": "모험",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_battle_castle",
     "res": "1280x720",
     "label": "모험 전투 HUD · 잿빛성",
     "before": [
      "img/before/adv_battle_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_castle",
     "res": "1600x720",
     "label": "모험 전투 HUD · 잿빛성",
     "before": [
      "img/before/adv_battle_castle_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_element",
     "res": "1280x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_element",
     "res": "1600x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 62,
   "title": "잿빛성 보상 UI",
   "area": "모험",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_battle_castle",
     "res": "1280x720",
     "label": "모험 전투 HUD · 잿빛성",
     "before": [
      "img/before/adv_battle_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_castle",
     "res": "1600x720",
     "label": "모험 전투 HUD · 잿빛성",
     "before": [
      "img/before/adv_battle_castle_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1280x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_castle",
     "res": "1600x720",
     "label": "모험 · 잿빛성 페이지",
     "before": [
      "img/before/adv_castle_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 63,
   "title": "모험은 바람 조각 성장 영향 없음",
   "area": "모험",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "adv_battle_element",
     "res": "1280x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_battle_element",
     "res": "1600x720",
     "label": "모험 전투 HUD · 원소섬 (숨결 · 순풍)",
     "before": [
      "img/before/adv_battle_element_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 64,
   "title": "고래 숨결 UI 품질",
   "area": "연출",
   "status": "완료",
   "owner": "skywhale-effect",
   "note": "크림 카드 → 시안의 둥근 게이지 구슬(금테·금빛 고리·숨결 색 물감이 차오르는 진주 구슬)+기운 하늘빛 이름 띠, 준비되면 금빛 후광·빛 훑기·알갱이. 위치는 그대로",
   "novisual": "",
   "caps": [
    {
     "id": "breath_cast",
     "res": "1280x720",
     "label": "고래 숨결 사용 연출",
     "before": [
      "img/before/breath_cast_f1_1280x720.jpg",
      "img/before/breath_cast_f2_1280x720.jpg",
      "img/before/breath_cast_f3_1280x720.jpg",
      "img/before/breath_cast_f4_1280x720.jpg",
      "img/before/breath_cast_f5_1280x720.jpg",
      "img/before/breath_cast_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_cast_f1_1280x720.jpg",
      "img/after/breath_cast_f2_1280x720.jpg",
      "img/after/breath_cast_f3_1280x720.jpg",
      "img/after/breath_cast_f4_1280x720.jpg",
      "img/after/breath_cast_f5_1280x720.jpg",
      "img/after/breath_cast_f6_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1280x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1280x720.jpg"
     ]
    },
    {
     "id": "breath_ready",
     "res": "1600x720",
     "label": "고래 숨결 버튼 (준비됨)",
     "before": [
      "img/before/breath_ready_1600x720.jpg"
     ],
     "after": [
      "img/after/breath_ready_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 65,
   "title": "적 수 2배",
   "area": "전투·밸런스",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "항해 스테이지 적 2배 · 이동 1.5배 · 동시 상한 40. 마리당 체력·공격·바람 조각·숨결·폭주 콤보를 나눠 성장 속도 유지 — 방치 6분×3지점 전/후: 스테이지 시간 ±1%, 처치 ×2, 바람 조각 −9~+9%(같은 코드 반복 오차 ±9%), 숨결 0~−8% (artifacts/feedback70/after/probe_65_stage_reward.json)",
   "novisual": "",
   "caps": [
    {
     "id": "enemy_wave",
     "res": "1280x720",
     "label": "적 등장 (종류 · 수)",
     "before": [
      "img/before/enemy_wave_f1_1280x720.jpg",
      "img/before/enemy_wave_f2_1280x720.jpg",
      "img/before/enemy_wave_f3_1280x720.jpg",
      "img/before/enemy_wave_f4_1280x720.jpg",
      "img/before/enemy_wave_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/enemy_wave_f1_1280x720.jpg",
      "img/after/enemy_wave_f2_1280x720.jpg",
      "img/after/enemy_wave_f3_1280x720.jpg",
      "img/after/enemy_wave_f4_1280x720.jpg",
      "img/after/enemy_wave_f5_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 66,
   "title": "색 지도 칠하기 버튼이 안 됨",
   "area": "색 지도",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "color_map",
     "res": "1280x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "color_map",
     "res": "1600x720",
     "label": "색 지도 (장소 · 보너스 · 칠하기 버튼)",
     "before": [
      "img/before/color_map_1600x720.jpg"
     ],
     "after": []
    }
   ]
  },
  {
   "n": 67,
   "title": "복귀 뒤 다시 오르는 느낌",
   "area": "전투·밸런스",
   "status": "대기",
   "owner": "",
   "note": "",
   "novisual": "",
   "caps": [
    {
     "id": "after_return_climb",
     "res": "1280x720",
     "label": "복귀 뒤 STAGE 1부터 다시 오르기",
     "before": [
      "img/before/after_return_climb_f1_1280x720.jpg",
      "img/before/after_return_climb_f2_1280x720.jpg",
      "img/before/after_return_climb_f3_1280x720.jpg",
      "img/before/after_return_climb_f4_1280x720.jpg",
      "img/before/after_return_climb_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/after_return_climb_f1_1280x720.jpg",
      "img/after/after_return_climb_f2_1280x720.jpg",
      "img/after/after_return_climb_f3_1280x720.jpg",
      "img/after/after_return_climb_f4_1280x720.jpg",
      "img/after/after_return_climb_f5_1280x720.jpg"
     ]
    },
    {
     "id": "return_ask",
     "res": "1280x720",
     "label": "복귀 확인 창",
     "before": [
      "img/before/return_ask_1280x720.jpg"
     ],
     "after": [
      "img/after/return_ask_1280x720.jpg"
     ]
    },
    {
     "id": "return_ask",
     "res": "1600x720",
     "label": "복귀 확인 창",
     "before": [
      "img/before/return_ask_1600x720.jpg"
     ],
     "after": [
      "img/after/return_ask_1600x720.jpg"
     ]
    },
    {
     "id": "return_cutscene",
     "res": "1280x720",
     "label": "복귀 연출",
     "before": [
      "img/before/return_cutscene_f1_1280x720.jpg",
      "img/before/return_cutscene_f2_1280x720.jpg",
      "img/before/return_cutscene_f3_1280x720.jpg",
      "img/before/return_cutscene_f4_1280x720.jpg",
      "img/before/return_cutscene_f5_1280x720.jpg",
      "img/before/return_cutscene_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/return_cutscene_f1_1280x720.jpg",
      "img/after/return_cutscene_f2_1280x720.jpg",
      "img/after/return_cutscene_f3_1280x720.jpg",
      "img/after/return_cutscene_f4_1280x720.jpg",
      "img/after/return_cutscene_f5_1280x720.jpg",
      "img/after/return_cutscene_f6_1280x720.jpg"
     ]
    },
    {
     "id": "return_reward",
     "res": "1280x720",
     "label": "귀환 보상",
     "before": [
      "img/before/return_reward_1280x720.jpg"
     ],
     "after": [
      "img/after/return_reward_1280x720.jpg"
     ]
    },
    {
     "id": "tut_return",
     "res": "1280x720",
     "label": "안내 · 복귀",
     "before": [
      "img/before/tut_return_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_return_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 68,
   "title": "「아이들」에서 편성 보이기",
   "area": "아이들·성장",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "「아이들」 목록 맨 앞에 크림 띠 「갑판 위」 묶음(편성 번호 순), 나머지는 「대기」로 이어짐 (시안 3). 편성 띠에서도 편성된 아이는 자리 번호로 덮임",
   "novisual": "",
   "caps": [
    {
     "id": "formation",
     "res": "1280x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1280x720.jpg"
     ],
     "after": [
      "img/after/formation_1280x720.jpg"
     ]
    },
    {
     "id": "formation",
     "res": "1600x720",
     "label": "편성 (항해 덱)",
     "before": [
      "img/before/formation_1600x720.jpg"
     ],
     "after": [
      "img/after/formation_1600x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1280x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1280x720.jpg"
     ]
    },
    {
     "id": "menu_heroes",
     "res": "1600x720",
     "label": "아이들 목록",
     "before": [
      "img/before/menu_heroes_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_heroes_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 69,
   "title": "모험 「클리어」 안내",
   "area": "모험",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "모험 퀘스트는 「클리어」가 아니라 「도전하기」(이기든 지든 완료) — 첫 시도가 막히지 않게",
   "novisual": "",
   "caps": [
    {
     "id": "adv_element",
     "res": "1280x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_element",
     "res": "1600x720",
     "label": "모험 · 원소 구름섬 페이지",
     "before": [
      "img/before/adv_element_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1280x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_soul",
     "res": "1600x720",
     "label": "모험 · 기억의 회랑 페이지",
     "before": [
      "img/before/adv_soul_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1280x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adv_temple",
     "res": "1600x720",
     "label": "모험 · 신전 · 승급전 페이지",
     "before": [
      "img/before/adv_temple_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1280x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1280x720.jpg"
     ],
     "after": []
    },
    {
     "id": "adventure_hub",
     "res": "1600x720",
     "label": "모험 허브 (콘텐츠 카드)",
     "before": [
      "img/before/adventure_hub_1600x720.jpg"
     ],
     "after": []
    },
    {
     "id": "guide_arena_1",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (1)",
     "before": [],
     "after": [
      "img/after/guide_arena_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_2",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (2)",
     "before": [],
     "after": [
      "img/after/guide_arena_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_3",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (3)",
     "before": [],
     "after": [
      "img/after/guide_arena_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_4",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (4)",
     "before": [],
     "after": [
      "img/after/guide_arena_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_arena_5",
     "res": "1280x720",
     "label": "손가락 안내 · 등급전 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_arena_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_1",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (1)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_2",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (2)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_3",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (3)",
     "before": [],
     "after": [
      "img/after/guide_dungeon_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_dungeon_4",
     "res": "1280x720",
     "label": "손가락 안내 · 모험 · 회랑 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_dungeon_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_1",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (1)",
     "before": [],
     "after": [
      "img/after/guide_element_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_2",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (2)",
     "before": [],
     "after": [
      "img/after/guide_element_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_element_3",
     "res": "1280x720",
     "label": "손가락 안내 · 원소 구름섬 (3)",
     "before": [],
     "after": [
      "img/after/guide_element_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_1",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (1)",
     "before": [],
     "after": [
      "img/after/guide_temple_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_2",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (2)",
     "before": [],
     "after": [
      "img/after/guide_temple_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_temple_3",
     "res": "1280x720",
     "label": "손가락 안내 · 신전 (3)",
     "before": [],
     "after": [
      "img/after/guide_temple_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_1",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (1)",
     "before": [],
     "after": [
      "img/after/guide_tower_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_2",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (2)",
     "before": [],
     "after": [
      "img/after/guide_tower_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_tower_3",
     "res": "1280x720",
     "label": "손가락 안내 · 잿빛성 (3)",
     "before": [],
     "after": [
      "img/after/guide_tower_3_1280x720.jpg"
     ]
    },
    {
     "id": "tut_dungeon",
     "res": "1280x720",
     "label": "안내 · 모험 · 회랑",
     "before": [
      "img/before/tut_dungeon_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_dungeon_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": 70,
   "title": "퀘스트 목록",
   "area": "퀘스트·보상",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "퀘스트 목록을 확정안 44줄 + 반복 8칸 바퀴(채색석 100/바퀴)로 교체, 처치 목표 2배(#65), 창을 닫아도 그 단계부터 「이어서 안내」로 재개 · 보상 합계 채색석 11,500 · 진주 64",
   "novisual": "",
   "caps": [
    {
     "id": "guide_build_1",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (1)",
     "before": [],
     "after": [
      "img/after/guide_build_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_2",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (2)",
     "before": [],
     "after": [
      "img/after/guide_build_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_3",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (3)",
     "before": [],
     "after": [
      "img/after/guide_build_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_build_4",
     "res": "1280x720",
     "label": "손가락 안내 · 분교 과학실 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_build_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_1",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (1)",
     "before": [],
     "after": [
      "img/after/guide_bulk_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_2",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (2)",
     "before": [],
     "after": [
      "img/after/guide_bulk_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_bulk_3",
     "res": "1280x720",
     "label": "손가락 안내 · 일괄 강화 (3) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_bulk_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_formation_1",
     "res": "1280x720",
     "label": "손가락 안내 · 편성 (1) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_formation_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_1",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (1)",
     "before": [],
     "after": [
      "img/after/guide_front_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_2",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (2)",
     "before": [],
     "after": [
      "img/after/guide_front_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_3",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (3)",
     "before": [],
     "after": [
      "img/after/guide_front_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_4",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (4)",
     "before": [],
     "after": [
      "img/after/guide_front_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_front_5",
     "res": "1280x720",
     "label": "손가락 안내 · 선두 배치 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_front_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_1",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (1)",
     "before": [],
     "after": [
      "img/after/guide_recommend_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_2",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (2)",
     "before": [],
     "after": [
      "img/after/guide_recommend_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_3",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (3)",
     "before": [],
     "after": [
      "img/after/guide_recommend_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_recommend_4",
     "res": "1280x720",
     "label": "손가락 안내 · 추천 편성 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_recommend_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_1",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (1)",
     "before": [],
     "after": [
      "img/after/guide_return_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_2",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (2)",
     "before": [],
     "after": [
      "img/after/guide_return_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_return_3",
     "res": "1280x720",
     "label": "손가락 안내 · 복귀 (3) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_return_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_1",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (1)",
     "before": [],
     "after": [
      "img/after/guide_star_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_2",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (2)",
     "before": [],
     "after": [
      "img/after/guide_star_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_3",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (3)",
     "before": [],
     "after": [
      "img/after/guide_star_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_4",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (4)",
     "before": [],
     "after": [
      "img/after/guide_star_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_5",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (5)",
     "before": [],
     "after": [
      "img/after/guide_star_5_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_6",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (6)",
     "before": [],
     "after": [
      "img/after/guide_star_6_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_7",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (7)",
     "before": [],
     "after": [
      "img/after/guide_star_7_1280x720.jpg"
     ]
    },
    {
     "id": "guide_star_8",
     "res": "1280x720",
     "label": "손가락 안내 · 승급 (8) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_star_8_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_1",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (1)",
     "before": [],
     "after": [
      "img/after/guide_study_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_2",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (2)",
     "before": [],
     "after": [
      "img/after/guide_study_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_3",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (3)",
     "before": [],
     "after": [
      "img/after/guide_study_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_study_4",
     "res": "1280x720",
     "label": "손가락 안내 · 색의 공명 연구 (4) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_study_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_1",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (1)",
     "before": [],
     "after": [
      "img/after/guide_whale_1_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_2",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (2)",
     "before": [],
     "after": [
      "img/after/guide_whale_2_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_3",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (3)",
     "before": [],
     "after": [
      "img/after/guide_whale_3_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_4",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (4)",
     "before": [],
     "after": [
      "img/after/guide_whale_4_1280x720.jpg"
     ]
    },
    {
     "id": "guide_whale_5",
     "res": "1280x720",
     "label": "손가락 안내 · 고래 강화 (5) · 보상 받기",
     "before": [],
     "after": [
      "img/after/guide_whale_5_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1280x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1280x720.jpg"
     ]
    },
    {
     "id": "hud_fresh",
     "res": "1600x720",
     "label": "전투 HUD (새 계정 · 항해사 Lv.1)",
     "before": [
      "img/before/hud_fresh_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_1600x720.jpg"
     ]
    },
    {
     "id": "hud_fresh_after_guides",
     "res": "1280x720",
     "label": "첫 안내를 마친 뒤 HUD",
     "before": [
      "img/before/hud_fresh_after_guides_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_fresh_after_guides_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1280x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1280x720.jpg"
     ]
    },
    {
     "id": "hud_mid",
     "res": "1600x720",
     "label": "전투 HUD (중반 저장 · 항해사 Lv.3 · 잠긴 메뉴)",
     "before": [
      "img/before/hud_mid_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_mid_1600x720.jpg"
     ]
    },
    {
     "id": "quest_chain5",
     "res": "1280x720",
     "label": "항해 퀘스트 5번 문구 (글자 간격)",
     "before": [
      "img/before/quest_chain5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_chain5_1280x720.jpg"
     ]
    },
    {
     "id": "quest_claim",
     "res": "1280x720",
     "label": "퀘스트 받기 → 재화가 날아가 HUD 숫자 증가",
     "before": [
      "img/before/quest_claim_f1_1280x720.jpg",
      "img/before/quest_claim_f2_1280x720.jpg",
      "img/before/quest_claim_f3_1280x720.jpg",
      "img/before/quest_claim_f4_1280x720.jpg",
      "img/before/quest_claim_f5_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_claim_f1_1280x720.jpg",
      "img/after/quest_claim_f2_1280x720.jpg",
      "img/after/quest_claim_f3_1280x720.jpg",
      "img/after/quest_claim_f4_1280x720.jpg",
      "img/after/quest_claim_f5_1280x720.jpg"
     ]
    },
    {
     "id": "quest_ready",
     "res": "1280x720",
     "label": "항해 퀘스트 완료 표시",
     "before": [
      "img/before/quest_ready_1280x720.jpg"
     ],
     "after": [
      "img/after/quest_ready_1280x720.jpg"
     ]
    },
    {
     "id": "tut_quest",
     "res": "1280x720",
     "label": "안내 · 퀘스트 받기",
     "before": [
      "img/before/tut_quest_1280x720.jpg"
     ],
     "after": [
      "img/after/tut_quest_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": "art-sharpness",
   "title": "큰 그림 선명도 (컷인 · 아이 상세 · 편성)",
   "area": "게임 전체",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "원인: ① 컷인 전용 판(assets/cutin/*_cutin_cut.png 1672×941)을 밉맵 없이 0.59배로 줄여 그려 윤곽선 · 머리카락이 계단처럼 깨짐 → 컷인 그림 가져오기에 밉맵 켬. ② 아이 상세(cover_art) · 편성 카드(lineup_card · place_card) 셰이더가 filter_linear(밉맵 없음)로 0.6~0.7배 축소 → filter_linear_mipmap. ③ SD 그림을 512로 줄여 둔 것(stand · cutin_sd)을 컷인 · 아이 상세에서 다시 1.75배 늘려 흐림 → 원본 해상도(최대 1024) 그림 main.stand_big · cutin_tex(미리 손질, 손질 전이면 그 프레임만 512). ④ 배경 지운 컷인 판의 알파가 윤곽선 바깥으로 2~4px 넉넉해 원래 배경색 테두리(후광)가 남음 → 원본 일러스트로 가장자리만 다시 가름(tools/cutin_defringe.gd, tools/cutin_cut.gd도 같은 손질), 13장, 손질 전 판 design/backup/cutin_cut_v1/. 소환 공개 · 이야기 무대는 0.67~1.03배 · 밉맵 있음이라 그대로. 창 배율 1.0(canvas_items · expand). 용량: APK 컷인 판 약 17.2→24.9MB(+7.6MB, 무손실 밉맵), VRAM 판 1장 6.3→8.4MB · 큰 SD 한 자세 약 +1.6MB(보이는 동안 · 캐시된 아이만). 수치 artifacts/feedback70/sharpness/measure_{before,after}.json, 3배 확대 비교 design/mockups/feedback70/sharpness/index.html",
   "novisual": "",
   "caps": [
    {
     "id": "sharp_cutin_arca",
     "res": "1280x720",
     "label": "궁극기 컷인 (멈춘 순간) · arca",
     "before": [
      "img/before/sharp_cutin_arca_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_arca_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_cutin_arca",
     "res": "1600x720",
     "label": "궁극기 컷인 (멈춘 순간) · arca",
     "before": [
      "img/before/sharp_cutin_arca_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_arca_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_cutin_lumi",
     "res": "1280x720",
     "label": "궁극기 컷인 (멈춘 순간) · lumi",
     "before": [
      "img/before/sharp_cutin_lumi_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_lumi_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_cutin_lumi",
     "res": "1600x720",
     "label": "궁극기 컷인 (멈춘 순간) · lumi",
     "before": [
      "img/before/sharp_cutin_lumi_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_lumi_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_cutin_serena",
     "res": "1280x720",
     "label": "궁극기 컷인 (멈춘 순간) · serena",
     "before": [
      "img/before/sharp_cutin_serena_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_serena_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_cutin_serena",
     "res": "1600x720",
     "label": "궁극기 컷인 (멈춘 순간) · serena",
     "before": [
      "img/before/sharp_cutin_serena_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_cutin_serena_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_formation",
     "res": "1280x720",
     "label": "편성 라인업 카드 그림",
     "before": [
      "img/before/sharp_formation_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_formation_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_formation",
     "res": "1600x720",
     "label": "편성 라인업 카드 그림",
     "before": [
      "img/before/sharp_formation_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_formation_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_gacha_sd",
     "res": "1280x720",
     "label": "소환 공개 · lumi",
     "before": [
      "img/before/sharp_gacha_sd_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_gacha_sd_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_gacha_sd",
     "res": "1600x720",
     "label": "소환 공개 · lumi",
     "before": [
      "img/before/sharp_gacha_sd_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_gacha_sd_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_gacha_ss",
     "res": "1280x720",
     "label": "소환 공개 · serena",
     "before": [
      "img/before/sharp_gacha_ss_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_gacha_ss_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_gacha_ss",
     "res": "1600x720",
     "label": "소환 공개 · serena",
     "before": [
      "img/before/sharp_gacha_ss_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_gacha_ss_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_arca",
     "res": "1280x720",
     "label": "아이 상세 큰 그림 · arca",
     "before": [
      "img/before/sharp_hero_arca_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_arca_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_arca",
     "res": "1600x720",
     "label": "아이 상세 큰 그림 · arca",
     "before": [
      "img/before/sharp_hero_arca_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_arca_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_lumi",
     "res": "1280x720",
     "label": "아이 상세 큰 그림 · lumi",
     "before": [
      "img/before/sharp_hero_lumi_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_lumi_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_lumi",
     "res": "1600x720",
     "label": "아이 상세 큰 그림 · lumi",
     "before": [
      "img/before/sharp_hero_lumi_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_lumi_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_serena",
     "res": "1280x720",
     "label": "아이 상세 큰 그림 · serena",
     "before": [
      "img/before/sharp_hero_serena_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_serena_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_hero_serena",
     "res": "1600x720",
     "label": "아이 상세 큰 그림 · serena",
     "before": [
      "img/before/sharp_hero_serena_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_hero_serena_1600x720.jpg"
     ]
    },
    {
     "id": "sharp_story",
     "res": "1280x720",
     "label": "이야기 무대 SD 아이",
     "before": [
      "img/before/sharp_story_1280x720.jpg"
     ],
     "after": [
      "img/after/sharp_story_1280x720.jpg"
     ]
    },
    {
     "id": "sharp_story",
     "res": "1600x720",
     "label": "이야기 무대 SD 아이",
     "before": [
      "img/before/sharp_story_1600x720.jpg"
     ],
     "after": [
      "img/after/sharp_story_1600x720.jpg"
     ]
    }
   ]
  },
  {
   "n": "grade-colors",
   "title": "등급 색 규칙 (SS 속성색 · 신화 무지개)",
   "area": "게임 전체",
   "status": "진행",
   "owner": "skywhale-ui",
   "note": "공용 GradeStyle(scripts/ui/grade_style.gd)로 통일: 소환 연출(예고 · 카드 · SS 소개) · 픽업/상시 배너 · 별가루 교환소 · 성장 기록/성장 꼬리표 · SS 이야기 카드 · 보상 팝업 · 전투 아이 발밑 고리 · 스킬 고리 · 각성 빛. SS 무지개 → 속성 색, 신화 = 무지개. 남은 곳: 전투 스킬칸(hud.gd) · 컷인 · 등급 이펙트 · ss_sprite 셰이더 · 편성 신화 꼬리표(각 담당) · 연출(skywhale-effect): SS 속성 서명 scripts/fx/ss_element_style.gd(+ss_element.gdshaderinc)을 GradeStyle.ss_palette/ss_tones 원본으로 연결, ss_sprite 림 · 컷인 · fx_tier(세레나 별똥별 · 초신성 고리 · SS 솟는 빛 · 프리즘) · fx_sig 불꽃 · ss_bloom/ss_nova 셰이더의 SS 무지개 → 속성 색",
   "novisual": "",
   "caps": [
    {
     "id": "gacha_reveal_SS",
     "res": "1280x720",
     "label": "소환 등급 연출 · SS (새 아이)",
     "before": [
      "img/before/gacha_reveal_SS_f1_1280x720.jpg",
      "img/before/gacha_reveal_SS_f2_1280x720.jpg",
      "img/before/gacha_reveal_SS_f3_1280x720.jpg",
      "img/before/gacha_reveal_SS_f4_1280x720.jpg",
      "img/before/gacha_reveal_SS_f5_1280x720.jpg",
      "img/before/gacha_reveal_SS_f6_1280x720.jpg",
      "img/before/gacha_reveal_SS_f7_1280x720.jpg",
      "img/before/gacha_reveal_SS_f8_1280x720.jpg",
      "img/before/gacha_reveal_SS_f9_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_reveal_SS_f1_1280x720.jpg",
      "img/after/gacha_reveal_SS_f2_1280x720.jpg",
      "img/after/gacha_reveal_SS_f3_1280x720.jpg",
      "img/after/gacha_reveal_SS_f4_1280x720.jpg",
      "img/after/gacha_reveal_SS_f5_1280x720.jpg",
      "img/after/gacha_reveal_SS_f6_1280x720.jpg",
      "img/after/gacha_reveal_SS_f7_1280x720.jpg",
      "img/after/gacha_reveal_SS_f8_1280x720.jpg",
      "img/after/gacha_reveal_SS_f9_1280x720.jpg"
     ]
    },
    {
     "id": "gacha_ten_result",
     "res": "1280x720",
     "label": "10연 소환 결과 · 신화 조각",
     "before": [
      "img/before/gacha_ten_result_1280x720.jpg"
     ],
     "after": [
      "img/after/gacha_ten_result_1280x720.jpg"
     ]
    },
    {
     "id": "grade_battle",
     "res": "1280x720",
     "label": "전투 · SS(속성 색)와 신화(무지개) 아이",
     "before": [
      "img/before/grade_battle_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_battle_1280x720.jpg"
     ]
    },
    {
     "id": "grade_battle_skill",
     "res": "1280x720",
     "label": "전투 · SS · 신화 스킬 고리",
     "before": [
      "img/before/grade_battle_skill_f1_1280x720.jpg",
      "img/before/grade_battle_skill_f2_1280x720.jpg",
      "img/before/grade_battle_skill_f3_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_battle_skill_f1_1280x720.jpg",
      "img/after/grade_battle_skill_f2_1280x720.jpg",
      "img/after/grade_battle_skill_f3_1280x720.jpg"
     ]
    },
    {
     "id": "grade_dust",
     "res": "1280x720",
     "label": "별가루 교환소 (SS 카드)",
     "before": [
      "img/before/grade_dust_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_dust_1280x720.jpg"
     ]
    },
    {
     "id": "grade_dust",
     "res": "1600x720",
     "label": "별가루 교환소 (SS 카드)",
     "before": [
      "img/before/grade_dust_1600x720.jpg"
     ],
     "after": [
      "img/after/grade_dust_1600x720.jpg"
     ]
    },
    {
     "id": "grade_reward",
     "res": "1280x720",
     "label": "보상 팝업 · SS · 신화 · S 아이",
     "before": [
      "img/before/grade_reward_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_reward_1280x720.jpg"
     ]
    },
    {
     "id": "grade_ss_flora_skill",
     "res": "1280x720",
     "label": "플로라 스킬 (프리즘 → 잎 · 꽃잎 서명)",
     "before": [],
     "after": [
      "img/after/grade_ss_flora_skill_f1_1280x720.jpg",
      "img/after/grade_ss_flora_skill_f2_1280x720.jpg",
      "img/after/grade_ss_flora_skill_f3_1280x720.jpg"
     ]
    },
    {
     "id": "grade_ss_ignis_ult",
     "res": "1280x720",
     "label": "이그니 궁극기 (SS 무지개 반짝이 → 불꽃 서명)",
     "before": [
      "img/before/grade_ss_ignis_ult_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_ss_ignis_ult_f1_1280x720.jpg",
      "img/after/grade_ss_ignis_ult_f2_1280x720.jpg",
      "img/after/grade_ss_ignis_ult_f3_1280x720.jpg"
     ]
    },
    {
     "id": "grade_ss_serena_ult",
     "res": "1280x720",
     "label": "세레나 궁극기 (별똥별 무지개 → 별 속성 색)",
     "before": [
      "img/before/grade_ss_serena_ult_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_ss_serena_ult_f1_1280x720.jpg",
      "img/after/grade_ss_serena_ult_f2_1280x720.jpg",
      "img/after/grade_ss_serena_ult_f3_1280x720.jpg"
     ]
    },
    {
     "id": "grade_ss_story",
     "res": "1280x720",
     "label": "이야기 · SS 이야기 카드",
     "before": [
      "img/before/grade_ss_story_1280x720.jpg"
     ],
     "after": [
      "img/after/grade_ss_story_1280x720.jpg"
     ]
    },
    {
     "id": "grade_ss_story",
     "res": "1600x720",
     "label": "이야기 · SS 이야기 카드",
     "before": [
      "img/before/grade_ss_story_1600x720.jpg"
     ],
     "after": [
      "img/after/grade_ss_story_1600x720.jpg"
     ]
    },
    {
     "id": "hero_codex",
     "res": "1280x720",
     "label": "성장 기록",
     "before": [
      "img/before/hero_codex_1280x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_1280x720.jpg"
     ]
    },
    {
     "id": "hero_codex",
     "res": "1600x720",
     "label": "성장 기록",
     "before": [
      "img/before/hero_codex_1600x720.jpg"
     ],
     "after": [
      "img/after/hero_codex_1600x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1280x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1280x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1280x720.jpg"
     ]
    },
    {
     "id": "hud_late",
     "res": "1600x720",
     "label": "전투 HUD (늦은 계정 · 모든 메뉴 열림)",
     "before": [
      "img/before/hud_late_1600x720.jpg"
     ],
     "after": [
      "img/after/hud_late_1600x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1280x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1280x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1280x720.jpg"
     ]
    },
    {
     "id": "menu_growth",
     "res": "1600x720",
     "label": "성장 (영구 레벨 · 승급)",
     "before": [
      "img/before/menu_growth_1600x720.jpg"
     ],
     "after": [
      "img/after/menu_growth_1600x720.jpg"
     ]
    },
    {
     "id": "mythic_shop",
     "res": "1280x720",
     "label": "신화 조각 상점",
     "before": [
      "img/before/mythic_shop_1280x720.jpg"
     ],
     "after": [
      "img/after/mythic_shop_1280x720.jpg"
     ]
    },
    {
     "id": "mythic_shop",
     "res": "1600x720",
     "label": "신화 조각 상점",
     "before": [
      "img/before/mythic_shop_1600x720.jpg"
     ],
     "after": [
      "img/after/mythic_shop_1600x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1280x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1280x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1280x720.jpg"
     ]
    },
    {
     "id": "reward_popup",
     "res": "1600x720",
     "label": "보상 팝업 (아이콘 모음)",
     "before": [
      "img/before/reward_popup_1600x720.jpg"
     ],
     "after": [
      "img/after/reward_popup_1600x720.jpg"
     ]
    },
    {
     "id": "story_menu",
     "res": "1280x720",
     "label": "이야기 목록",
     "before": [
      "img/before/story_menu_1280x720.jpg"
     ],
     "after": [
      "img/after/story_menu_1280x720.jpg"
     ]
    },
    {
     "id": "story_menu",
     "res": "1600x720",
     "label": "이야기 목록",
     "before": [
      "img/before/story_menu_1600x720.jpg"
     ],
     "after": [
      "img/after/story_menu_1600x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1280x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1280x720.jpg"
     ]
    },
    {
     "id": "summon_pickup",
     "res": "1600x720",
     "label": "소환 · 픽업 출석부",
     "before": [
      "img/before/summon_pickup_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_pickup_1600x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1280x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1280x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1280x720.jpg"
     ]
    },
    {
     "id": "summon_standard",
     "res": "1600x720",
     "label": "소환 · 상시 출석부",
     "before": [
      "img/before/summon_standard_1600x720.jpg"
     ],
     "after": [
      "img/after/summon_standard_1600x720.jpg"
     ]
    },
    {
     "id": "ult_cutin",
     "res": "1280x720",
     "label": "궁극기 컷인 → 궁극기 (SS)",
     "before": [
      "img/before/ult_cutin_f1_1280x720.jpg",
      "img/before/ult_cutin_f2_1280x720.jpg",
      "img/before/ult_cutin_f3_1280x720.jpg",
      "img/before/ult_cutin_f4_1280x720.jpg",
      "img/before/ult_cutin_f5_1280x720.jpg",
      "img/before/ult_cutin_f6_1280x720.jpg"
     ],
     "after": [
      "img/after/ult_cutin_f1_1280x720.jpg",
      "img/after/ult_cutin_f2_1280x720.jpg",
      "img/after/ult_cutin_f3_1280x720.jpg",
      "img/after/ult_cutin_f4_1280x720.jpg",
      "img/after/ult_cutin_f5_1280x720.jpg",
      "img/after/ult_cutin_f6_1280x720.jpg"
     ]
    },
    {
     "id": "ult_cutin_mythic",
     "res": "1280x720",
     "label": "궁극기 컷인 (신화 등급)",
     "before": [],
     "after": [
      "img/after/ult_cutin_mythic_f1_1280x720.jpg",
      "img/after/ult_cutin_mythic_f2_1280x720.jpg",
      "img/after/ult_cutin_mythic_f3_1280x720.jpg",
      "img/after/ult_cutin_mythic_f4_1280x720.jpg"
     ]
    }
   ]
  },
  {
   "n": "portraits",
   "title": "초상화 얼굴 정렬",
   "area": "게임 전체",
   "status": "완료",
   "owner": "skywhale-ui",
   "note": "63명 모두 얼굴 기준점(가운데 · 이마~턱 높이)을 원본 그림에서 재서(tools/portrait_marks.json → scripts/ui/portrait_anchors.gd) 공용 scripts/ui/portrait.gd로 자름: 얼굴이 칸 정가운데 · 모든 아이 같은 얼굴 크기 · 늘이지 않음. main.portrait()(160px 캐시)가 이 규칙을 써서 전투 덱 칸 · 아이들 목록 · 도감 · 소환 결과 · 보상 팝업 · 상점 · 이야기 합류 아이콘이 한꺼번에 바뀜. 편성 카드는 card 스타일, 이야기 카드 구석 아이는 bust 스타일. design/dps_view/faces도 같은 규칙으로 다시 만듦. PD 3차(2차의 아이별 얼굴 줄이기는 없앰): 머리카락 · 머리 꼭대기가 보이게 틀을 넓힘 — 얼굴 높이/칸 round 0.46→0.31 · square 0.42→0.29 · card 0.24→0.20, 모든 아이 같은 얼굴 크기. 얼굴은 가로 가운데, 세로는 보통 머리 꼭대기(얼굴 가운데에서 1.8 face_h 위)가 칸 안에 들도록 조금 아래(round 0.58 · square 0.56 · card 0.40). 머리+머리카락+장식 실루엣을 63명 모두 재서(tools/portrait_hair.gd 자동 + 소품이 붙은 12명 손 보정 → Anchors.HAIR, 보통 = 가운데값 HAIR_NORM) 풍성한 머리 · 큰 올림머리 · 양갈래 · 큰 장식처럼 보통보다 크고 칸 밖으로 넘치는 아이만 칸을 머리 쪽으로 옮김(넘친 만큼까지, 칸의 18% 한도, 실제 최대 약 12%) — square 기준 63명 중 약 30명, 나머지는 같은 자리 (Portrait.fit, 검사 tools/portrait_check.gd bad=0). bust는 그대로. PD 4차(오른쪽 빈 띠): 오른쪽을 보는 3/4 얼굴이라 오른쪽 머리가 일찍 끝나 칸 오른쪽에 바탕만 남는 아이를 재서(tools/portrait_right.gd: 스타일별 칸 행에서 불투명 8% 이상인 열의 왼쪽 · 오른쪽 끝 → Anchors.LEFT/RIGHT) 빈 띠가 칸 폭 18%를 넘는 아이만 칸을 그림 쪽으로 옮김(얼굴은 칸 안에서 오른쪽으로) — 띠가 4%까지, 왼쪽에 새 빈 띠가 오른쪽보다 넓어지기 전 · 머리 맞춤과 합쳐 칸의 18%까지. 얼굴 크기는 그대로. 160px 정사각에서 바뀐 아이 18명: 아영 · 비나 · 보람 · 다희 · 결 · 하나 · 하늘 · 홍이 · 미소 · 새봄 · 서윤 · 솔 · 수아 · 연우 · 여름 · 예린 · 영은 · 유리 (나머지 45명 그대로; 카드는 칸이 좁아 더 많은 아이가 조금씩 옮겨짐). PD 5차(4차 규칙 대체): round · square · card 모두, 63명 모두 가로로 머리 실루엣(Anchors.HAIR = 머리+머리카락+머리 장식, 든 물건 · 효과 뺌; 장식 상자 좌우까지 합침)의 가운데를 칸 가운데에 둠 — 한도 없음, 실루엣이 칸보다 넓으면 양쪽이 같게 잘림. 얼굴 크기 · 세로 규칙은 그대로, 얼굴은 칸 가운데보다 오른쪽에 옴(3/4 얼굴). 좌우 빈 띠(칸 행에서 그림 내용 끝까지, tools/portrait_check.gd 보고) |왼−오른| ≤ 6%: 정사각 72px 53/63 · 세로 칸 63/63, round 61~63/63, card 136x176 42/63 · 220x300 46/63. 고르지 않은 칸은 대부분 card — 칸이 머리보다 넓어 든 물건 · 팔 · 몸이 있는 오른쪽만 차고 왼쪽에 바탕이 남음. 6차(card만): 가로 가운데 = 머리 실루엣 가운데 50% + 칸 행 안의 보이는 그림 전체(머리+몸+든 물건) 가운데 50% (Portrait.CARD_BODY). round · square는 머리 실루엣 그대로. card 균형 |왼−오른| ≤ 6%: 136x176 42→56/63 · 220x300 46→60/63 (남은 곳: 리아 · 유리 · 여름 · 채원 · 미오 · 노엘 · 연우 — 한쪽에 큰 물건 · 땋은 머리가 있어 섞어도 반대쪽이 남음). 편성 · 아이 상세 · 승급 확인 AFTER 다시 찍음. 남은 곳(서 있는 그림을 직접 쓰는 칸): 아이 상세 · 승급 확인 · 소환 SS 소개(표정 그림) · 아이 반응 말풍선(표정 그림) — 각 담당. 전/후 모음: artifacts/feedback70/portraits/ · 아이 상세(서 있는 그림을 쓰는 아이) · 승급 확인 카드도 Portrait.apply(…, \"card\")로 바꿈 — 그림 칸을 판 전체로 넓혀 얼굴이 모든 아이 같은 자리 · 크기 (skywhale-ui)",
   "novisual": "",
   "caps": [
    {
     "id": "portraits_1",
     "res": "160px × 63",
     "label": "63명 초상화 (160px) BEFORE vs 새 틀 — 점선: 칸 가운데",
     "before": [
      "img/before/portraits_portraits_before.png"
     ],
     "after": [
      "img/after/portraits_portraits_after.png"
     ]
    },
    {
     "id": "portraits_2",
     "res": "160px × 63",
     "label": "지금(4차) vs 머리 실루엣 가운데(5차) — 63명 시트",
     "before": [
      "img/before/portraits_portraits_current.png"
     ],
     "after": [
      "img/after/portraits_portraits_after.png"
     ]
    },
    {
     "id": "portraits_3",
     "res": "160px × 63",
     "label": "아이마다 지금(4차) · 새 틀(5차, 금색 테) 나란히 — 63명 모두",
     "before": [],
     "after": [
      "img/after/portraits_portraits_compare.png"
     ]
    },
    {
     "id": "portraits_4",
     "res": "136x176 × 63",
     "label": "card(편성 카드) — 지금(머리 실루엣 가운데) · 새(머리 50% + 그림 전체 50%, 금색 테)",
     "before": [],
     "after": [
      "img/after/portraits_portraits_card_compare.png"
     ]
    },
    {
     "id": "portraits_5",
     "res": "1280x720",
     "label": "아이 상세 (루미, 서 있는 그림) 전/후",
     "before": [
      "img/before/portraits_ui_hero_lumi_tab0_before_1280.png"
     ],
     "after": [
      "img/after/portraits_ui_hero_lumi_tab0_after_1280.png"
     ]
    },
    {
     "id": "portraits_6",
     "res": "1600x720",
     "label": "아이 상세 (루미, 서 있는 그림) 전/후",
     "before": [
      "img/before/portraits_ui_hero_lumi_tab0_before_1600.png"
     ],
     "after": [
      "img/after/portraits_ui_hero_lumi_tab0_after_1600.png"
     ]
    },
    {
     "id": "portraits_7",
     "res": "1280x720",
     "label": "승급 확인 카드 전/후",
     "before": [
      "img/before/portraits_ui_star_confirm_ok_before_1280.png"
     ],
     "after": [
      "img/after/portraits_ui_star_confirm_ok_after_1280.png"
     ]
    },
    {
     "id": "portraits_8",
     "res": "1600x720",
     "label": "승급 확인 카드 전/후",
     "before": [
      "img/before/portraits_ui_star_confirm_ok_before_1600.png"
     ],
     "after": [
      "img/after/portraits_ui_star_confirm_ok_after_1600.png"
     ]
    }
   ]
  },
  {
   "n": "sound-panel",
   "title": "소리 창에서 테스트 · QA 정보 분리",
   "area": "설정",
   "status": "완료",
   "owner": "skywhale-tech",
   "note": "PD 결정: 출시용 소리 창(설정 → 「소리 설정」)은 배경 음악 · 효과음 볼륨 슬라이더와 켬/끔만 (SoundPanel.open). 출력 경로 · dB · 지연 수치 · 탭 지연 테스트 · 게임 효과음 쉬기 · 효과음/BGM 목록 시험 재생은 그대로 개발자 메뉴(「메뉴」 → 「개발」 → 「사운드 테스트 · 진단」, SoundPanel.open_dev)로 옮김 — 개발 메뉴는 skywhale/dev_cheats + 디버그 빌드에서만 보이고 open_dev도 릴리스 빌드에서는 열리지 않음. 저장 형식 · 볼륨 반영은 그대로. 창 모양은 그대로 두고 내용만 나눔 (UI 재디자인은 목업 뒤 별도). release_ui_check에 「소리 창은 볼륨 줄만 · 개발 창에는 진단/시험 도구」 검사 추가",
   "novisual": "",
   "caps": [
    {
     "id": "sound_panel",
     "res": "1280x720",
     "label": "설정 → 소리 창",
     "before": [
      "img/before/sound_panel_1280x720.jpg"
     ],
     "after": [
      "img/after/sound_panel_1280x720.jpg"
     ]
    },
    {
     "id": "sound_panel",
     "res": "1600x720",
     "label": "설정 → 소리 창",
     "before": [
      "img/before/sound_panel_1600x720.jpg"
     ],
     "after": [
      "img/after/sound_panel_1600x720.jpg"
     ]
    },
    {
     "id": "sound_panel_dev",
     "res": "1280x720",
     "label": "개발자 메뉴 → 사운드 테스트 · 진단",
     "before": [],
     "after": [
      "img/after/sound_panel_dev_1280x720.jpg"
     ]
    },
    {
     "id": "sound_panel_dev",
     "res": "1600x720",
     "label": "개발자 메뉴 → 사운드 테스트 · 진단",
     "before": [],
     "after": [
      "img/after/sound_panel_dev_1600x720.jpg"
     ]
    },
    {
     "id": "sound_panel_dev_menu",
     "res": "1280x720",
     "label": "개발자 메뉴 (디버그 빌드만) · 사운드 테스트 · 진단 버튼",
     "before": [],
     "after": [
      "img/after/sound_panel_dev_menu_1280x720.jpg"
     ]
    }
   ]
  }
 ]
};
