extends "res://tools/feedback_capture.gd"

# 묶음 11 「시스템 안내」 시안의 「지금」 사진 + 시안 바탕: feedback_capture.gd 늦은 계정 상태에서 게임 함수 그대로 띄워 1280 · 1600 둘 다 찍는다.
# 게임 동작 · 저장은 바꾸지 않는다 (시안 폴더 전용 캡처 스크립트 · 비공개 APPDATA).
# 실행: $env:CAPTURE_SCRIPT='res://design/mockups/feedback70/batch11_system/tools/now_capture.gd'; node tools/feedback_capture_run.mjs <출력> late

const TAGS := ["batch11"]

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
	await _section("b11", _b11)
	await _section("b11_gear", _b11_gear)
	await _section("b11_bg", _b11_bg)

# 시안 바탕: 의뢰 창 · 알림 없이 전투만
func _b11_bg() -> void:
	await _battle(_safe_stage(stage_at), 3.0)
	var prep := func() -> void:
		main.requests._close_panel()
		if is_instance_valid(main.requests.slide_box):
			main.requests.slide_box.queue_free()
		await _wait(1.2)
	await prep.call()
	await _both("bg_battle", "전투 (시안 바탕 · 알림 없음)", TAGS, prep)

func _quit_prep() -> void:
	if is_instance_valid(main.back_nav.quit_layer):
		main.back_nav.quit_layer.queue_free()
		main.back_nav.quit_layer = null
	await _frames(2)
	main.back_nav.ask_quit()
	await _wait(0.4)

func _corrupt_prep(restored: bool) -> void:
	hud._close_modal()
	await _frames(2)
	if restored:
		main.save_restored = "2026년 11월 10일 21:40 · 스테이지 31"
	else:
		main.save_corrupt = "save_test.json.corrupt"
	main._notify_corrupt_save()
	await _wait(0.4)

func _banner_prep(title: String, sub: String) -> void:
	hud.banner(title, sub, Color("ff4d5e"))
	await _wait(0.32)

func _b11() -> void:
	await _battle(_safe_stage(stage_at), 2.5)
	await _both("now_battle", "전투 (시안 바탕)", TAGS)
	await _quit_prep()
	await _both("now_quit", "게임 종료 확인", TAGS, _quit_prep)
	main.back_nav.quit_layer.queue_free()
	main.back_nav.quit_layer = null
	await _wait(0.3)
	await _corrupt_prep(false)
	await _both("now_corrupt", "저장 손상 · 처음부터", TAGS, _corrupt_prep.bind(false))
	await _corrupt_prep(true)
	await _both("now_restored", "저장 손상 · 백업에서 되살림", TAGS, _corrupt_prep.bind(true))
	hud._close_modal()
	await _wait(0.3)
	await _banner_prep(Economy.FAIL_TEXT["no_gems"], "")
	await _both("now_fail_gems", "구매 실패 띠 · 채색석", TAGS, _banner_prep.bind(Economy.FAIL_TEXT["no_gems"], ""))
	await _wait(1.8)
	var clock := "시계가 이전으로 바뀌었어요 · 하루 보상은 원래 시각이 지나면 다시 열려요"
	await _banner_prep("기기 시간 확인", clock)
	await _both("now_clock", "기기 시간 확인 띠", TAGS, _banner_prep.bind("기기 시간 확인", clock))
	await _wait(1.8)
	var power: PowerSave = main.power
	power._set_dimmed(true)
	await _wait(1.6)
	await _both("now_power", "방치 절전 · 막 절전", TAGS)
	power._set_dimmed(false)
	await _wait(0.3)

# 장비 작업대 (구매 실패 리본 시안 바탕): 유나 리본 전설 +20 을 고른 작업대
func _b11_gear() -> void:
	print("B11 gear battle")
	await _battle(_safe_stage(stage_at), 1.5)
	print("B11 gear add")
	if not "yuna" in main.unlocked:
		main.unlocked.append("yuna")
	var target := Gear.make(9800, 0, 3, 4, "", "starlight")
	target["l"] = 20
	main.add_gear(target)
	main.equip(9800, "yuna")
	var prep := func() -> void:
		for c in hud.root.get_children():
			if c is Menus:
				(c as Menus).close()
		await _frames(2)
		var menu := Menus.open(hud, "gear")
		menu.gear_hero = "yuna"
		menu.gear_sel = 9800
		menu._render()
		print("B11 gear rendered")
		await _wait(0.7)
	await prep.call()
	print("B11 gear prep done")
	var img := root.get_texture().get_image()
	print("B11 got image ", img.get_size())
	await _both("now_gear", "장비 작업대 (시안 바탕)", TAGS, prep)
