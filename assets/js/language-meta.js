/**
 * Language Detection and Meta Tag Update Script
 * Detects browser language and updates meta tags accordingly
 */

(function() {
    'use strict';

    // 언어별 메타 데이터 정의
    const metaData = {
        // 한국어
        'ko': {
            description: 'For Fun, For Fiction, For Fans. 더 많은 유저들을 위해 재미있고, 유니크한 이야기가 있는 게임을 만들고자 하는 게임 개발 스튜디오입니다.',
            keywords: 'LiTRAIL,리트레일,GateOfGates,게임개발,게임스튜디오,모바일게임,PC게임',
            classification: '게임,캐릭터,소프트웨어,그래픽',
            title: '리트레일 LiTRAIL - For Fun, For Fiction, For Fans'
        },
        // 일본어
        'ja': {
            description: 'For Fun, For Fiction, For Fans. より多くのユーザーのために、楽しくユニークなストーリーのあるゲームを作ることを目指すゲーム開発スタジオです。',
            keywords: 'LiTRAIL,リトレール,ゲート・オブ・ゲーツ,ゲーム開発,ゲームスタジオ,モバイルゲーム,PCゲーム',
            classification: 'ゲーム,キャラクター,ソフトウェア,グラフィック',
            title: 'リトレール LiTRAIL - For Fun, For Fiction, For Fans'
        },
        // 영어
        'en': {
            description: 'For Fun, For Fiction, For Fans. A game development studio dedicated to creating fun games with unique stories for more users.',
            keywords: 'LiTRAIL,Gate of Gates,game development,game studio,mobile games,PC games',
            classification: 'Games,Characters,Software,Graphics',
            title: 'LiTRAIL - For Fun, For Fiction, For Fans'
        }
    };

    /**
     * 브라우저 언어 감지
     * @returns {string} 언어 코드 ('ko', 'ja', 'en')
     */
    function detectLanguage() {
        // navigator.language 또는 navigator.userLanguage에서 언어 코드 추출
        const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();

        // 언어 코드의 첫 2글자 추출 (예: 'ko-KR' -> 'ko')
        const langCode = browserLang.substring(0, 2);

        // 지원하는 언어인지 확인
        if (metaData[langCode]) {
            return langCode;
        }

        // 지원하지 않는 언어는 영어로 기본 설정
        return 'en';
    }

    /**
     * 메타 태그 업데이트
     * @param {string} lang 언어 코드
     */
    function updateMetaTags(lang) {
        const data = metaData[lang];

        if (!data) {
            console.warn('Language not supported:', lang);
            return;
        }

        // SEO Meta Tags 업데이트
        const metaDescription = document.getElementById('meta-description');
        if (metaDescription) {
            metaDescription.setAttribute('content', data.description);
        }

        const metaKeywords = document.getElementById('meta-keywords');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', data.keywords);
        }

        const metaClassification = document.getElementById('meta-classification');
        if (metaClassification) {
            metaClassification.setAttribute('content', data.classification);
        }

        // Open Graph Meta Tags 업데이트
        const ogTitle = document.getElementById('og-title');
        if (ogTitle) {
            ogTitle.setAttribute('content', data.title);
        }

        const ogDescription = document.getElementById('og-description');
        if (ogDescription) {
            ogDescription.setAttribute('content', data.description);
        }

        // Twitter Card Meta Tags 업데이트
        const twitterTitle = document.getElementById('twitter-title');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', data.title);
        }

        const twitterDescription = document.getElementById('twitter-description');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', data.description);
        }

        // 디버깅용 로그 (프로덕션에서는 제거 가능)
        console.log('Meta tags updated for language:', lang);
    }

    /**
     * 초기화 함수
     */
    function init() {
        // 브라우저 언어 감지
        const detectedLang = detectLanguage();

        // 메타 태그 업데이트
        updateMetaTags(detectedLang);

        // HTML lang 속성도 업데이트
        document.documentElement.setAttribute('lang', detectedLang);
    }

    // DOM이 로드되면 초기화 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // 이미 로드된 경우 즉시 실행
        init();
    }

})();
