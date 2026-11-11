extends "res://tools/feedback_capture.gd"

# 묶음 10 「설정」 시안의 「지금」 사진: feedback_capture.gd 늦은 계정 상태에서 실제 버튼이 부르는 함수로 띄워 1280 · 1600 둘 다 찍는다.
# 게임 동작 · 저장은 바꾸지 않는다 (시안 폴더 전용 캡처 스크립트 · 비공개 APPDATA).
# 실행: $env:CAPTURE_SCRIPT='res://design/mockups/feedback70/batch10_settings/tools/now_capture.gd'; node tools/feedback_capture_run.mjs <출력> late

const TAGS := ["batch10"]

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
	await _section("b10", _b10)

func _settings(view: String) -> void:
	SettingsPanel.open(hud)
	await _frames(2)
	if view != "":
		SettingsPanel._build(weakref(hud), weakref(hud.modal), view)
	await _wait(0.6)

func _b10() -> void:
	await _battle(_safe_stage(stage_at), 2.5)
	# 출항 때 미끄러져 들어오는 「새 의뢰」 카드(island_requests.gd _slide, 3.6초 뒤 사라짐)가 지나간 뒤에 찍는다
	await _wait(4.5)
	await _both("now_battle", "전투 (시안 바탕)", TAGS)
	hud.toggle_more(true)
	await _wait(0.8)
	await _both("now_more", "메뉴 펼침", TAGS)
	hud.toggle_more(false)
	await _wait(0.4)
	await _settings("")
	await _both("now_settings", "설정", TAGS, _settings.bind(""))
	var power: PowerSave = main.power
	var fps0: int = power.fps
	power.fps = 30
	await _settings("")
	await _one("now_settings_30", "설정 · 30 절전", TAGS)
	power.fps = fps0
	await _settings("credits")
	await _both("now_credits", "만든 사람들", TAGS, _settings.bind("credits"))
	hud._close_modal()
	await _wait(0.3)
	SoundPanel.open(hud)
	await _wait(0.6)
	await _both("now_sound", "소리 설정 창", TAGS, func(): SoundPanel.open(hud); await _wait(0.5))
	SoundPanel.open_dev(hud)
	await _wait(0.8)
	await _one("now_sound_dev", "개발 · 사운드 테스트 · 진단", TAGS)
	hud._close_modal()
	await _wait(0.3)
	power._set_dimmed(true)
	await _wait(1.6)
	await _one("now_power", "방치 절전", TAGS)
	power._set_dimmed(false)
	await _wait(0.3)
