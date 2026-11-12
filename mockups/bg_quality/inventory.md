# 배경 전수 인벤토리 · 레인보우 아틀리에

조사 기준: 현재 작업 트리의 GDScript 참조와 실제 PNG/JPEG 헤더. 게임 파일 변경 없음. 경로는 프로젝트 루트 기준. `assets/story_art/`는 현재 존재하지 않으며 배경 폴더가 아니라 `scripts/ui/story_kit.gd`의 **일반 비율 캐릭터 일러스트 예약 경로**다. 실제 이야기 배경은 `assets/story/` 및 `assets/colorworld/`다.

## 1. 본편 1–6장 · 공유 파랄랙스

근거: `scripts/sky_layers.gd`의 `setup`, `_strip`, `set_chapter`, `_process`. 속도는 기준 좌표계 px/s이며 `voyage × BattleTime.speed` 배율이 붙는다. 기준 1280×720, 좌우 MARGIN 420. 1600×720에서는 가로 확장. 하늘은 1400×800을 덮도록 등비 확대하고 좌우 반전 복제. 섬과 구름은 왼쪽 이동·순환. 장 변경 시 0.35초 백색 전환 후 0.6초 해제.

| 경로 | 원본 해상도 | 등장 / 레이어 / 움직임 |
|---|---|---|
| `assets/world/layer_sky.png` | 1672×941 | 1장 벚꽃 군도, 고정 최후면. 타이틀·귀환에도 공유 |
| `assets/world/layer_mid.png` | 1672×941 | 1장 섬, y=300, 16px/s, 배율 0.72, 섬 사이 700px 여백, MID_TINT |
| `assets/world/ch2/layer_sky.png` | 1672×941 | 2장 등불 해협, 고정 하늘 |
| `assets/world/ch2/layer_mid.png` | 1672×941 | 2장 섬, 동일 16px/s |
| `assets/world/ch3/layer_sky.png` | 1672×941 | 3장 서리 고원, 고정 밤하늘, 해 FX를 차가운 달빛으로 변경 |
| `assets/world/ch3/layer_mid.png` | 1672×941 | 3장 섬, 동일 16px/s |
| `assets/world/ch4/layer_sky.png` | 1672×941 | 4장 온실 군도, 고정 하늘 |
| `assets/world/ch4/layer_mid.png` | 1672×941 | 4장 섬, 동일 16px/s |
| `assets/world/ch5/layer_sky.png` | 1672×941 | 5장 물안개 암초, 고정 하늘. 분교 하늘에도 공유 |
| `assets/world/ch5/layer_mid.png` | 1672×941 | 5장 섬, 동일 16px/s |
| `assets/world/ch6/layer_sky.png` | 1672×941 | 6장 노을 성층, 고정 하늘 |
| `assets/world/ch6/layer_mid.png` | 1672×941 | 6장 섬, 동일 16px/s |
| `assets/world/layer_far_loop.png` | 1254×941 | 전 장 공유 먼 구름, y=390, 5px/s. 타이틀·절전·귀환 보상에도 공유 |
| `assets/world/layer_near_loop.png` | 1254×941 | 전 장 공유 앞 구름, CanvasLayer 1, y=375, 55px/s. 아래쪽 수직 반전 보충. 분교·절전·귀환·보상 공유 |
| `assets/world/bg_sky.png` | 1672×941 | 스킬 미리보기 및 이야기 메뉴 기본/실패 대체 배경, 정적 cover |

추가 합성층: `_build_sun`의 halo/core/9개 회전 광선/3개 빛살, `_wisps`의 연무, `_wind`의 바람·rush, `_gust`의 고래 기류. 이미지 교체만으로 기존 과한 빛이 사라지지 않는다. `assets/colorworld/ash_tint.gdshader`가 섬·구름의 잿빛→원색을 제어한다. 이 제안에서는 수치·셰이더를 수정하지 않는다.

### 고래·갑판: 배경 교체에서 보존해야 하는 실물 전경

| 경로 | 해상도 | 사용 |
|---|---|---|
| `assets/world/whale_giant.png` | 1983×793 | 본편 main, 이야기 메뉴, 절전, 고래 강화 |
| `assets/world/whale_v4.png` | 2172×724 | 타이틀 고래, 상하 부유·꼬리 셰이더 |
| `assets/world/whale_sd.png` | 2172×724 | 메뉴·허브·보상·설정의 작은 고래 |

캐릭터와 고래 그림은 이번 교체 대상이 아니다.

## 2. 분교 / 학교 내부

근거: `scripts/ui/school_page.gd`의 `_backdrop`, `_room_art`, `LOOK`, `ROOMS`. 방 뒤→아이→가구 앞→공사 덮개 순. 방 내부 clip, TextureRect STRETCH_SCALE. 별도 카메라 파랄랙스는 없고 `school_room.gdshader`의 창빛/먼지가 움직인다.

| 경로 | 해상도 | 등장 / 합성 |
|---|---|---|
| `assets/ui/school/house.png` | 1200×1067 | 전체 분교 단면 외곽, 방 위에 덮음, 636×565.33 표시 |
| `assets/ui/school/room_lab_bg.png` | 1024×276 | 과학실 후경, 545.1×131.7 표시 |
| `assets/ui/school/room_lab_fg.png` | 1024×276 | 과학실 전경 가구, 아이 앞 |
| `assets/ui/school/room_gym_bg.png` | 400×260 | 체육관 후경, 269.5×175.8 표시, 별도 fg 없음 |
| `assets/ui/school/room_cafe_bg.png` | 400×260 | 급식실 후경, 269.5×175.8 표시. 이번 실내 샘플 기준 |
| `assets/ui/school/room_cafe_fg.png` | 400×260 | 급식실 전경 가구, 아이 앞 |
| `assets/ui/school/tex_walnut.jpg` | 512×512 | 연구 칠판 나무 테, 공간 그림이 아니라 재질 |
| `assets/ui/school/tex_chalk.jpg` | 900×600 | 칠판 분필 결 |
| `assets/ui/school/tex_paper.jpg` | 512×512 | 이름표·고래 강화 종이 결 |

학교 바깥 하늘은 `assets/world/ch5/layer_sky.png` + `assets/world/layer_near_loop.png`를 `assets/ui/fx/school_sky.gdshader`로 합성. 1124×566 본문과 아래 앞 구름 영역을 따로 그린다. 실내 샘플은 아트 비교용 1600×720 확장판이며 실제 작은 방 비율의 최종 납품판은 아니다. 과학실의 매우 긴 비율은 별도 구도 설계가 필요하다.

## 3. 모험: 실제 사용되는 bg2

근거: `scripts/content_sky.gd`의 `art_path`, `make`; `scripts/adventure_pages.gd`의 `art_key`; `scripts/ui/adv_kit.gd`의 `stage`. 전투에서는 기존 후경을 덮는 정적 그림 + 좌우 반전 복제 + 0.6초 fade, 고래·갑판·앞 구름 유지. 분위기 `assets/adventure/fx/ambience.gdshader` 10모드. 메뉴에서는 1140×638 무대에 `adv_stage.gdshader`와 먼지 합성. **그림 자체의 독립 파랄랙스는 없다.**

| 경로 | 해상도 | 등장 |
|---|---|---|
| `assets/adventure/bg2/hub.jpg` | 1600×720 | 모험 허브 메뉴, 전투 키 아님 |
| `assets/adventure/bg2/element_red.jpg` | 1600×720 | 붉은 원소섬 메뉴·전투·원소섬 소개 대화 |
| `assets/adventure/bg2/element_blue.jpg` | 1600×720 | 푸른 원소섬 메뉴·전투 |
| `assets/adventure/bg2/element_green.jpg` | 1600×720 | 초록 원소섬 메뉴·전투 |
| `assets/adventure/bg2/element_purple.jpg` | 1600×720 | 보라 원소섬 메뉴·전투 |
| `assets/adventure/bg2/element_white.jpg` | 1600×720 | 하얀 원소섬 메뉴·전투 |
| `assets/adventure/bg2/element_orange.jpg` | 1600×720 | 주황 원소섬 메뉴·전투 |
| `assets/adventure/bg2/castle.jpg` | 1600×720 | 잿빛성 메뉴·전투·소개 대화 |
| `assets/adventure/bg2/temple.jpg` | 1600×720 | 신전 메뉴·전투·소개 대화 |
| `assets/adventure/bg2/rank.jpg` | 1600×720 | 등급전 메뉴·전투·소개 대화 |
| `assets/adventure/bg2/soul.jpg` | 1600×720 | 기억의 회랑 메뉴·전투·소개 대화 |

### 허브의 별도 섬 전경 (배경과 함께 재감수)

전부 420×400, `scripts/ui/adv_kit.gd`의 `ISL` 동적 경로로 메뉴 메달/섬 삽화에 사용. 전체 배경과는 별도 에셋이며 자동으로 새 bg2에서 잘라 쓰지 않는다.

`assets/adventure/isl/castle.png`, `assets/adventure/isl/temple.png`, `assets/adventure/isl/rank.png`, `assets/adventure/isl/soul.png`, `assets/adventure/isl/story.png`, `assets/adventure/isl/element_red.png`, `assets/adventure/isl/element_blue.png`, `assets/adventure/isl/element_green.png`, `assets/adventure/isl/element_purple.png`, `assets/adventure/isl/element_white.png`, `assets/adventure/isl/element_orange.png`.

## 4. 이야기 / 컷신 / 색 지도

근거: `scripts/game_data.gd`의 `CHAPTERS`, `ADV_INTRO`; `scripts/ss_stories.gd`; `scripts/story_player.gd`의 `@bg` 명령과 cg TextureRect(cover); `scripts/ui/adv_soul.gd`의 `PLACE`, `place_tex`; `scripts/color_world.gd`의 장소 art/대본. 정적 배경 전환, 아이/대사창 별도 전경. `@bg ""`는 배경을 걷고 현재 전투 하늘을 노출한다.

| 경로 | 해상도 | 등장 |
|---|---|---|
| `assets/story/bg_bell_tower.png` | 1672×941 | 1장 종탑 이야기·SS 이야기·회랑 액자 |
| `assets/story/bg_festival.png` | 1672×941 | 2장 축제 이야기·SS 이야기·회랑 액자 |
| `assets/story/bg_observatory.png` | 1672×941 | 3장 천문대 이야기·SS 이야기·회랑 액자 |
| `assets/story/bg_garden.png` | 1672×941 | 4장 정원 이야기·SS 이야기·회랑 액자 |
| `assets/story/bg_lighthouse.png` | 1672×941 | 5장 등대 이야기·회랑 액자 |
| `assets/story/bg_sundial.png` | 1672×941 | 6장 해시계 이야기·회랑 액자 |
| `assets/colorworld/ch1_pier.png` | 1672×941 | 벚꽃 선착장 색 지도 미리보기·복원 이야기 |
| `assets/colorworld/ch1_market.png` | 1672×941 | 꽃잎 시장 거리 색 지도·이야기 |
| `assets/colorworld/ch1_windchime.png` | 1672×941 | 풍경 공방 색 지도·이야기 |
| `assets/colorworld/ch1_hill.png` | 1672×941 | 벚꽃 언덕 색 지도·이야기 |
| `assets/colorworld/ch1_bell.png` | 1672×941 | 멈춘 종탑 색 지도·이야기 |

`assets/colorworld/ch1_map.png` (1672×941)는 현재 스크립트 직접 참조 없음. 현 색 지도는 `ColormapDrawer`의 장소별 그림 액자 방식이다. 아카이브 후보로 분리하되 삭제하지 않는다.

`assets/story_art/`: 현재 디렉터리/이미지 없음. `StoryKit.art()`가 향후 전신 캐릭터를 찾는 자리. `assets/cutin/`도 인물 중심 컷인 삽화이며 배경 전수 교체에 섞어 캐릭터를 다시 그리지 않는다. `scripts/cutin.gd`의 band/title 셰이더 연출은 별도 감수 대상.

## 5. 타이틀 / 소환 / 귀환 / 장 완료 / 시스템

| 경로 | 원본 해상도 | 등장 / 합성·움직임 / 근거 |
|---|---|---|
| `assets/world/layer_sky.png` | 1672×941 | 타이틀 cover, `assets/ui/title_sky.gdshader` 톤 조정. `scripts/title.gd::_build_art` |
| `assets/world/layer_far_loop.png` | 1254×941 | 타이틀 1.02배 타일 띠, 아래 정렬, 왼쪽 이동. 고래·아이 앞 구름/종이결/햇살은 별도 |
| `assets/ui/summon_bg.png` | 1672×941 | 소환 연출 흐린 도서관 후경, `scripts/gacha_show.gd`의 LIBRARY/BACKDROP. `assets/ui/fx/atelier_backdrop.gdshader` 등불/먼지/어둠, 이젤 전경 별도 |
| `assets/ui/summon_standard.png` | 1672×941 | 상시 소환 배너 삽화. `scripts/ui/summon_page.gd`, 캐릭터 포함 여부 유지하며 배경만 재감수 |
| `assets/world/layer_sky.png` | 1672×941 | 귀환/장 정산 시네마틱. `scripts/ui/return_voyage.gd::_build`, `return_voyage_sky.gdshader`에서 수평 반전하여 광원을 오른쪽 위로 옮기고 새벽색 합성 |
| `assets/world/layer_mid.png` | 1672×941 | 귀환 연출 공유 섬 소스 |
| `assets/world/layer_near_loop.png` | 1254×941 | 귀환 연출 공유 앞 구름 소스 |
| `assets/ui/reward/png/ret_cloud.png` | 620×272 | 귀환 보상 계열 구름 장식 조각. 완성 배경이 아닌 전경 장식으로 별도 감수 |
| `assets/ui/fx/reward_dawn.gdshader` | 절차형 / 표시 RET_SIZE | 귀환 보상 윗그림 새벽 하늘. `scripts/ui/levelup_art.gd`, far/near 공유 띠 각각 UV 0.004 / 0.012 scroll |
| `assets/ui/fx/clear_sky.gdshader` | 절차형 / viewport | 정화 연출 먹구름·일출, `scripts/fx/clear_sunrise.gd`. 기본 전투 위 오버레이, 별도 래스터 배경 없음 |
| `assets/ui/system/night_sky.jpg` | 1600×720 | 절전 화면 cover. `scripts/ui/sleep_sky.gd` 별·초승달·고래 + far/near 밤색 합성 |
| `assets/ui/system/paper_pearl.jpg` | 512×512 | 종료 카드 종이 재질, `scripts/ui/quit_card.gd`, 공간 배경 아님 |
| `assets/ui/system/paper_parch.jpg` | 512×512 | 시스템 종이 재질 자산, 공간 배경 아님 |
| `assets/ui/fx/credits_sky.gdshader` | 절차형 / 표시 영역 | 설정 크레딧 하늘, `scripts/settings_panel.gd`, credits_cloud와 고래 합성 |

`assets/brand/keyart_bg.png` (1672×941)는 현재 GDScript 직접 참조 없음. 현재 타이틀 배경으로 오인하지 않는다. 부팅 splash/로고는 환경 배경이 아닌 브랜드 이미지이므로 이번 교체에서 보존한다.

## 6. 메뉴 후경: 파일 그림이 없는 것도 포함

공통: `scripts/menus.gd::_render`가 현재 전투 위에 남색 60% dim을 깔고 `scripts/ui/hub_frame.gd::sheet`가 1140×638 종이 판을 만든다. 메뉴를 열어도 뒤 전투는 계속된다. 따라서 **공유 전투 배경 교체가 메뉴 바깥 후경에도 영향을 준다.**

| 경로 / 구현 | 해상도 | 등장 / 합성 |
|---|---|---|
| `assets/ui/fx/hub_sheet.gdshader` | 절차형 / 1140×638 | 아이들·도감·소환·모험·분교·상점 공통 허브 종이, 허브별 mode/색/장식 |
| `assets/ui/fx/lineup_stage.gdshader` | 절차형 / 1116×568 | 편성 밤 라벤더 무대, 카드 뒤 spotlight·바닥; `scripts/ui/formation_page.gd` |
| `scripts/ui/hero_page.gd::_backdrop` | 절차형 / SIZE | 아이 상세: 남색 바탕+속성색 radial gradient+UiSoft story backdrop, 인물 cutin 전경 |
| `scripts/ui/gear_bench.gd`의 UiSoft story backdrop | 절차형 / SIZE | 장비 작업대, 방사광/장식 배경 |
| `assets/ui/fx/whale_sheet.gdshader` | 절차형 / 본문 | 고래 강화 해부도 종이와 `whale_dome.gdshader` 돔, `scripts/ui/whale_page.gd` |
| `assets/ui/fx/awaken_sky.gdshader` | 절차형 / SIZE | 각성 속성색 하늘, `scripts/ui/awaken_sky.gd`, 원색/신화 무지개 변형 |
| `assets/ui/fx/story_wash.gdshader` | 절차형 / viewport | 이야기 보상 색 번짐, `scripts/ui/story_reward.gd`, swash/motes 전경 |
| `assets/ui/fx/settings_sheet.gdshader` | 절차형 / 창 영역 | 설정 종이 판, 별도 실내 그림 없음 |
| `scripts/ui/colormap_drawer.gd` 내장 셰이더 | 절차형 / 우측 40% | 색 지도 남색 아틀리에 판, 장소 그림은 4절 자산을 재사용 |
| `scripts/story_menu.gd` | 재사용 / 메뉴 썸네일 | 이야기 배경 첫 @bg를 표지로 사용, 없으면 bg_sky, 고래 메뉴 삽화 별도 |
| `scripts/ui_soft.gd` + `scripts/hud_skin.gd` | 절차형 / 가변 | 크림/라벤더/금색 공통 판. 공간 그림이 아니므로 배경 전면 재작화와 구분해 유지 |

## 7. 남아 있지만 현 배경 경로가 아닌 구판 / 원본

삭제·교체하지 않는다. 현재 렌더링 배경과 혼동해 중복 발주하지 않기 위한 목록이다.

| 경로 | 해상도 | 판정 |
|---|---|---|
| `assets/world/layer_far.png` | 1672×941 | 구판 비루프 구름, 현 SkyLayers는 loop 사용 |
| `assets/world/layer_near.png` | 1672×941 | 구판 비루프 구름 |
| `assets/world/raw/layer_far_loop_orig.png` | 1254×941 | 제작 원본 |
| `assets/world/raw/layer_near_loop_orig.png` | 1254×941 | 제작 원본 |
| `assets/world/raw/deck_crop.png` | 960×640 | 갑판 제작 원본 |
| `assets/world/raw/deck_edit.png` | 1536×1024 | 갑판 제작 원본 |
| `assets/world/raw/whale_giant_orig.png` | 1983×793 | 고래 제작 원본 |
| `assets/world/whale.png` | 2172×724 | 현 직접 스크립트 참조 없음 |
| `assets/world/whale_front.png` | 1774×887 | 현 직접 스크립트 참조 없음 |
| `assets/world/whale_v2.png` | 2172×724 | 구판 고래 |
| `assets/world/whale_v3.png` | 2172×724 | 구판 고래 |
| `assets/ui/room_lab.png` | 256×256 | 구판 방 아이콘, 현 분교는 school/room_* 사용 |
| `assets/ui/room_gym.png` | 256×256 | 구판 방 아이콘 |
| `assets/ui/room_cafe.png` | 256×256 | 구판 방 아이콘 |

다음은 **각 파일 1672×941**, 현재 모험 bg2 이전 세트다. 현재 `ContentSky.art_path`, `AdvPages.art_path`, `AdvKit.BG`는 이 경로를 사용하지 않는다.

- `assets/adventure/bg/bg_castle.png`
- `assets/adventure/bg/bg_temple.png`
- `assets/adventure/bg/bg_element_red.png`
- `assets/adventure/bg/bg_element_blue.png`
- `assets/adventure/bg/bg_element_green.png`
- `assets/adventure/bg/bg_element_purple.png`
- `assets/adventure/bg/bg_element_white.png`
- `assets/adventure/bg/bg_element_orange.png`
- `assets/adventure/page_castle.png`
- `assets/adventure/page_temple.png`
- `assets/adventure/page_rank.png`
- `assets/adventure/page_soul.png`
- `assets/adventure/page_element_red.png`
- `assets/adventure/page_element_blue.png`
- `assets/adventure/page_element_green.png`
- `assets/adventure/page_element_purple.png`
- `assets/adventure/page_element_white.png`
- `assets/adventure/page_element_orange.png`

## 8. 발주 / 교체 배치

1. **기준판 고정**: 1장 sky/far/mid/near 4층 + 급식실 bg/fg. B의 선 정리와 A의 대기 깊이를 수작업으로 통합. 실제 SD·피해 숫자·보호막을 겹쳐 PD 승인. AI 샘플을 완성 원화로 납품하지 않는다.
2. **공유 노출면**: 1장 네 층 → 타이틀·귀환·절전·보상·분교 하늘의 공유 참조를 함께 검수. 광원 반전/달밤/잿빛 복원과 기존 glow 누적 확인.
3. **2–6장**: 장별 sky/mid 10장과 공유 구름의 색 변형. 지역 실루엣·광원·기상 차이를 먼저 확정. 중경 섬을 거대 성채로 채우지 않는다.
4. **모험 11종**: bg2 11장 + isl 11개 동시 감수. 6속성을 단순 색상 바꾸기로 처리하지 않고 소재/구름 구조로 구분. 전투와 1140×638 메뉴 crop 모두 승인.
5. **분교**: 집 외곽·3방 후경·2방 전경. 과학실 긴 비율 및 실제 269px 작은 방에서 선 밀도 확인. 전경 가구가 아이를 가리는 현 합성 순서 보존.
6. **이야기/색 지도**: 이야기 6장 + 장소 5장, 같은 장소의 공용 디자인 시트 사용. 회랑 액자·표지 썸네일·잿빛 복원을 함께 검수.
7. **나머지 전용 화면**: 소환 도서관/배너, night_sky, 크레딧과 절차형 후경의 과한 장식만 별도 승인 후 조정. 공통 UI 판과 캐릭터는 유지.

최종 납품: 원본 레이어 문서 + alpha PNG/불투명 sky + 각 층의 가려진 영역까지 그린 clean plate. 루프 구름은 좌우 이음매·반복 패턴, 1280×720/1600×720/확장 가장자리, 1×/항해 가속, clear/ash/속성 FX, gl_compatibility 메모리·드로콜 검수. 현재 페이지는 단일 평면 방향 샘플이며 분리판은 미납품이다. 이미지 처리 스크립트 실행이 시스템 정책으로 차단되었고 우회하지 않았다. 페이지 내부에서만 1600×720 JPEG로 압축 표시한다. 저장된 압축 이미지/분리 레이어와 수작업 클린업·무봉제화는 남은 작업이며 게임에 사용하지 않는다.
