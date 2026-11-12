(()=>{
const section=document.createElement('section');section.id='battle-restored';
section.innerHTML='<h1>전투 배경 복원</h1><p>전투 1–6장과 무한 항로의 배경을 배치1 이전 SkyLayers로 복원했습니다. 하늘·섬·구름 원본 14개는 <code>design/backup/bg_batch1-UUXslL/</code>와 바이트 단위로 동일합니다. 601 이후는 <code>GameData.region_of(stage)</code>를 따르며 색 복원 회귀 검사의 숫자 상태 관리도 유지합니다.</p><p class="note">아래 A 적용·장1 견본은 과거 비교 기록입니다. 현재 게임에는 연결되지 않습니다. 배치1 게임용 자산·셰이더·비활성 도구는 <code>archived_batch1/</code>로 옮겨 보존했습니다. 분교·모험·이야기·타이틀·소환·메뉴 배경은 변경하지 않았습니다. 다음 방향은 밝은 바탕의 저채도 파스텔·라벤더–핑크 음영·깔끔한 형태·최소 장식이며, 별도 견본 승인 전 적용하지 않습니다.</p>';
for(const ch of [1,4]){const block=document.createElement('div');block.innerHTML='<h2>'+ch+'장 · '+(ch===1?'벚꽃 군도':'온실 군도')+'</h2><div class="pair"><figure><img src="batch1/before/ch'+ch+'_1600x720.jpg" alt="'+ch+'장 배치1 이전 배경 1600×720"><figcaption>기존 before 기준</figcaption></figure><figure><img src="restored/captures/ch'+ch+'_restored_1600x720.jpg" alt="'+ch+'장 복원된 게임 배경 1600×720"><figcaption>복원 후 실제 게임 · 1600×720</figcaption></figure></div>';section.append(block)}
section.insertAdjacentHTML('beforeend','<p>동일 저장·STAGE 33·1600×720 구도에서 배경 지역만 전환한 실제 캡처입니다. 하늘·섬·구름 소스와 합성·스크롤 방식은 백업의 원래 구현이며, 전투 FX·적 위치는 실행 시점에 따라 달라 픽셀 단위 동일 화면은 아닙니다.</p>');
section.insertAdjacentHTML('beforeend','<p class="note">복원 후 검사: color 1 / releaseui 121 / first_session 49 / endless 46 / endless-load 22건 모두 실패 0, 런타임 오류 로그 없음. 변경 스크립트 check-only 진단 없음. 메인 검사·게임 검사 종료의 0xC0000005는 알려진 종료 크래시로 별도 기록했습니다.</p>');
document.querySelector('main').prepend(section);
})();
