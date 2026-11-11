extends "res://tools/feedback_capture.gd"

# 묶음 8 「상점 · 교환」 시안의 「지금」 사진: feedback_capture.gd 늦은 계정 상태에서 실제 버튼이 부르는 함수로 띄워 1280 · 1600 둘 다 찍는다.
# 게임 동작 · 저장은 바꾸지 않는다 (시안 폴더 전용 캡처 스크립트).
# 실행: $env:CAPTURE_SCRIPT='res://design/mockups/feedback70/batch8_shop/tools/now_capture.gd'; node tools/feedback_capture_run.mjs <출력> late

const TAGS := ["batch8"]

func _late() -> void:
	var waited := 0.0
	while not main.in_game and waited < 30.0:
		await process_frame
		waited += 1.0 / 60.0
	main.tutorial.finish_all()
	main.auto_ult = false
	stage_at = int(main.stage)
	await _wait(2.0)
	await _close_popups()
	await _section("go_late", _go_late)
	await _section("b8", _b8)

func _b8() -> void:
	await _battle(_safe_stage(stage_at), 2.5)
	await _both("now_battle", "전투 (시안 바탕)", TAGS)
	for p in [["shop", "now_shop", "상점"], ["mythic_shop", "now_mythic", "신화 조각 상점"]]:
		var m := Menus.open(hud, p[0])
		await _wait(0.7)
		await _both(p[1], p[2], TAGS)
		m.close()
		await _wait(0.3)
	var s := Menus.open(hud, "summon")
	await _wait(0.8)
	await _both("now_summon", "소환 무대 (시안 바탕)", TAGS)
	s.banner = "standard"
	s._render()
	await _wait(0.8)
	await _both("now_summon_std", "소환 무대 · 상시 (시안 바탕)", TAGS)
	s.banner = "pickup"
	s.show_dust = true
	s._render()
	await _wait(0.8)
	await _both("now_dust", "별가루 교환소", TAGS)
	s.show_dust = false
	s.show_rates = true
	s._render()
	await _wait(0.8)
	await _both("now_rates", "확률 정보", TAGS)
	s.banner = "standard"
	s._render()
	await _wait(0.8)
	await _one("now_rates_std", "확률 정보 · 상시", TAGS)
	s.close()
	await _wait(0.4)
	await _cleanup()
	await _battle(_safe_stage(stage_at), 1.5)
	RewardPopup.open(hud, "매일 무료 선물", [{"kind": "gems", "amount": main.economy.SHOP_FREE_GEMS}])
	await _wait(0.9)
	await _one("now_free", "매일 무료 선물", TAGS)
	await _close_popups()
	await _wait(0.4)
	RewardPopup.open(hud, "구매 완료", [{"kind": "gems", "amount": 240}], "채색석 120")
	await _wait(0.9)
	await _one("now_paid", "구매 완료", TAGS)
	await _close_popups()
