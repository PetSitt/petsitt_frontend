import React from 'react';
import styled from 'styled-components';
import logo_en from '../assets/img/logo_en.png';
import logo_ko from '../assets/img/logo_ko.png';
import prize_1 from '../assets/img/img_prize_1.png';
import prize_2 from '../assets/img/img_prize_2.png';
import prize_3 from '../assets/img/img_prize_3.png';

const MarketingArea = ({page, _display, setMarketing, storage}) => {
  return (
    <MarketingPage className={page === 'main' ? 'main marketingPage' : 'marketingPage'} style={{display: _display ? 'block' : 'none'}}>
      <div className='marketing_head'>
        {/* <img src={logo_en} alt="petsitt" /> */}
        <div className='titleArea'>
          <div className='inner'>
            <span>EVENT</span>
            {/* <img src={logo_ko} alt="펫싯" style={{width: '100px'}}/> */}
            <h2>Petsitt 체험하고 상품받자!</h2>
            <p>반려견 케어 서비스가 필요할 때, <br/>우리 동네 돌보미들을 찾아 문의해보세요!</p>
            {
              page === 'main' && (
                <Button type="button" className='white' onClick={()=>{
                  setMarketing(false);
                  sessionStorage.setItem('marketingOnMobile', false);
                }}>Petsitt 체험 시작하기<i className='ic-arw-right'></i></Button>
              )
            }
          </div>
        </div>
        <div className='contentArea'>
          <div className="inner">
          <dl>
            <dt>참여 기간</dt>
            <dd>2022. 07. 27 ~ 08. 01</dd>
          </dl>
          <dl>
            <dt>참여 방법</dt>
            <dd>
              <ol>
                <li>
                  <span>STEP 1</span>
                  <p><strong>회원가입</strong>, 나의 정보 페이지에서 <strong>나의 반려견을 등록</strong>해주세요 (없는 경우도 가상으로 진행가능)</p>
                </li>
                <li>
                  <span>STEP 2</span>
                  <p><strong>메인화면</strong>에서 <strong>돌보미를 선택</strong>하여 <strong>예약</strong>을 진행합니다. <strong>문의하기</strong>도 사용해보세요!</p>
                </li>
                <li>
                  <span>STEP 3</span>
                  <p>체험 완료 후 <strong>구글폼 작성</strong>까지 완료하면 끝!</p>
                  <a href='https://forms.gle/8P1mzCKyuY9Aj7HGA' target="_blank" rel="noreferrer">구글폼으로 이동</a>
                </li>
              </ol>
            </dd>
          </dl>
          <dl>
            <dt>상품 안내</dt>
            <dd>
              <ul>
              <li>
                  <em>1등 (1명)</em>
                  <p>정성스런 피드백을 <br/>작성해주신 분</p>
                  <img src={prize_1} alt="신세계 상품권"/>
                  <p className='prize'>신세계 상품권 10만원</p>
                </li>
                <li>
                  <em>2등 (2명)</em>
                  <p>정성스런 피드백을 <br/>작성해주신 분</p>
                  <img src={prize_2} alt="신세계 상품권"/>
                  <p className='prize'>신세계 상품권 5만원</p>
                </li>
                <li>
                  <em>참가상 (선착순 44명)</em>
                  <p>필수 step을 모두 수행한 분</p>
                  <img src={prize_3} alt="스타벅스 아이스아메리카노 Tall 사이즈 기프티콘"/>
                  <p className='prize'>스타벅스 아이스아메리카노 Tall 사이즈 기프티콘</p>
                </li>
              </ul>
            </dd>
          </dl>
          <div>
            {
              page === 'main' && (
                <Button type="button" onClick={()=>{
                  setMarketing(false);
                  sessionStorage.setItem('marketingOnMobile', false);
                }}>Petsitt 체험 시작하기<i className='ic-arw-right'></i></Button>
              )
            }
          </div>
          </div>
        </div>
      </div>
    </MarketingPage>
  )
}


const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  background-color: #FC9215;
  color: #fff;
  font-weight: 700;
  border-radius: 6px;
  margin-top: 20px;
  i{
    font-size: 20px;
    margin-top: 1px;
    margin-left: 5px;
  }
  &.white{
    width: auto;
    padding: 0 14px;
    background-color: #fff;
    color: #FC9215;
    line-height: 30px;
    font-size: 14px;
    margin: 20px auto 0;
    i{
      font-size: 16px;
      margin-top: -1px;
      margin-left: 2px;
    }
  }
`
const MarketingPage = styled.div`
  height: 100vh;
  padding: 0;
  background-color: #F5F5F5;
  overflow: hidden;
  overflow-y: auto;
  z-index: -100;
  &.main{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 400;
    text-align: center;
    padding-bottom: 100px;
    .inner{
      padding-left: 20px;
      padding-right: 20px;
    }
    .titleArea{
      padding: 30px 0;
      span{
        font-size: 14px;
        line-height: 22px;
        padding: 0 6px;
      }
      h2{
        font-size: 24px;
        margin-top: 14px;
      }
      p{
        font-size: 16px;
        line-height: 1.4;
        margin-top: 10px;
      }
    }
    .contentArea{
      padding: 40px 0;
      dl{
        dt{
          font-size: 16px;
        }
        dd{
          font-size: 14px;
          p{
            font-size: 12px;
          }
          span{
            font-size: 12px;
            margin-bottom: 10px;
          }
          a{
            font-size: 12px;
          }
          .prize{
            font-size: 14px;
          }
        }
      }
    }
  }
  .inner{
    padding-left: 15%;
    padding-right: 60px;
  }
  .titleArea{
    background-color: #FC9215;
    padding: 100px 0 40px;
    span{
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      color: #FFF4E8;
      background-color: #E46E00;
      border-radius: 5px;
      line-height: 28px;
      padding: 0 10px;
      vertical-align: middle;
      margin-right: 10px;
    }
    img{
      display: inline-block;
      vertical-align: middle;
    }
    h2{
      display: inline-block;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.2;
      vertical-align: middle;
      margin-left: 8px;
      color: #fff;
      @media (max-width:1280px) {
        display: block;
        margin-left: 0;
        margin-top: 10px;
      }
    
    }
    p{
      font-size: 18px;
      line-height: 1.5;
      margin-top: 20px;
      color: #fff;
    }
  }
  .contentArea{
    padding: 60px 0;
    dl{
      & + dl{
        margin-top: 30px;
      }
      display: flex;
      gap: 20px;
      color: #333;
      @media (max-width:1600px) {
        flex-direction: column;
        gap: 10px;
      }
      dt{
        font-size: 20px;
        flex-shrink: 0;
        font-weight: 700;
      }
      dd{
        font-size: 18px;
        ol, ul{
          display: flex;
          gap: 20px;
          @media (max-width:1280px) {
            flex-direction: column;
            gap: 10px;
          }
          li{
            flex-basis: 33.333%;
            padding: 15px;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 10px;
            border: 1px solid #eee;
            text-align: center;
            span,
            em{
              display: inline-block;
              font-size: 14px;
              font-weight: 700;
              border-bottom: 1px solid #FC9215;
              padding-bottom: 3px;
              margin-bottom: 15px;
              color: #FC9215;
            }
            p{
              font-size: 15px;
              line-height: 1.4;
              word-break: keep-all;
              strong{
                font-weight: 700;
              }
            }
            .prize{
              font-size: 16px;
              font-weight: 700;
              line-height: 1.2;
              letter-spacing: -.03em;
              @media (max-width:1280px) {
                min-height: 0;
              }
            }
            a{
              display: inline-block;
              color: #fff;
              background-color: #FC9215;
              font-weight: 700;
              font-size: 14px;
              line-height: 30px;
              padding: 0 10px;
              border-radius: 6px;
              margin-top: 10px;
            }
          }
        }
        ol li{
          min-height: 195px;
          @media (max-width:1280px) {
            min-height: 0;
          }
        }
        ul li p{
          min-height: 2.8em;
          @media (max-width:1280px) {
            min-height: 0;
          }
        }
      }
    }
  }
  .inner{
    padding-right: calc(10% + 412px + 60px)
  }
  @media (max-width:1600px) {
    .inner{
      padding-left: 10vw;
      
    }
  }
`
export default MarketingArea;