import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Cookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DateObject,Calendar } from "react-multi-date-picker";
import styled from 'styled-components';
import { apis } from "../store/api";

import MapContainer from "./MapContainer";
import SearchAddress from "./SearchAddress";
import icon_star from '../assets/img/icon_star.png';
import icon_map from '../assets/img/icon_map.png';
import StyledButton from "../elements/StyledButton";


function Home() {
	const datepickerRef = useRef();
	const today = new DateObject();
	const cookies = new Cookies();
	const queryClient = useQueryClient();
	const filterAreaRef = useRef();
	const [date, setDate] = useState(new Date());
	const [dates, setDates] = useState(new Date());
	const [addressInfo, setAddressInfo] = useState();
	const [address, setAddress] = useState();
	const [iframeDisplay, setIframeDisplay] = useState(false);
	const categories = [
		{ walk: "산책" },
		{ wash: "목욕, 모발 관리" },
		{ prac: "훈련" },
		{ dayCare: "데이 케어" },
		{ boarding: "1박 케어" },
	];
  const [queriesData, setQueriesData] = useState({});
	const [category, setCategory] = useState(categories);
	const [searched, setSearched] = useState(false);
	const [sitters, setSitters] = useState(null);
	const [currentPosition, setCurrentPosition] = useState();
	const [defaultSearch, setDefaultSearch] = useState(false);
	const [viewType, setViewType] = useState('list');
	const [locationItems, setLocationItems] = useState();
	const [mapHeight, setMapHeight] = useState();
	const getLocationButtonRef = useRef();
	const [datepickerDisplay, setDatepickerDisplay] = useState(false);
	const getSittersList = (queriesData, category) => {
		console.log(queriesData, category)
		if(category.length > 0 && category.length < 5){
			for(let i=0; i<category.length; i++){
				const cate_key = Object.keys(category[i])[0];
				const cate_value = Object.values(category[i])[0];
				queriesData[cate_key] = cate_value;
			}
		}
		return apis.getSittersList(queriesData);
	};
	const {data: sittersFilteredSearch, isLoading: sittersFilteredIsLoading, isFetched: sittersFilteredIsFetched, isRefetching: sittersAfterIsRefetching} = useQuery(
		["sitter_list", queriesData, category],
		() => getSittersList(queriesData, category),
		{
			onSuccess: (data) => {
				console.log(data);
				setSearched(false);
			},
			onError: (data) => {
				console.error(data);
				setSearched(false);
			},
			enabled: !!searched,
			staleTime: Infinity,
		},
	);
	// useEffect(() => {
	// 	if (date.length) {
	// 		const getDates = date.map((v) => {
	// 			return v.format(v._format);
	// 		});
	// 		setDates(getDates);
	// 	}
	// }, [date]);
	const setDatesFormat = () => {
		if (date.length) {
			const getDates = date.map((v) => {
				return v.format(v._format);
			});
			setDates(getDates);
		}
	}

	useEffect(()=>{
		if(dates?.length && addressInfo){
			setQueriesData({searchDate: dates, region_2depth_name: addressInfo.region_2depth_name, x: addressInfo.x, y: addressInfo.y})
		}
	}, [dates, addressInfo])

	// 로그인 여부 확인하는 api
	const { mutate: checkUser } = useMutation(()=>apis.checkUser(), { 
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (data) => {
			console.log(data);
		},
		staleTime: Infinity,
	});
	
	const getListApi = (currentPosition, category) =>{
		console.log(currentPosition)
		const categoryData = {}
		if(category.length > 0 && category.length < 5){
			for(let i=0; i<category.length; i++){
				const cate_key = Object.keys(category[i])[0];
				const cate_value = Object.values(category[i])[0];
				categoryData[cate_key] = cate_value;
			}
		}
		console.log(currentPosition, categoryData)
		return apis.getSittersDefault({...currentPosition, ...categoryData});
	}
	const {data: sittersBeforeSearch, isLoading: sittersIsLoading, isFetched: sittersIsFetched, refetch: refetchSitters, isRefetching: sittersIsRefetching} = useQuery(
		["sitter_default", currentPosition, category], () => getListApi(currentPosition, category),
		{
			onSuccess: (data) => {
				console.log(data);
				setDefaultSearch(false);
			},
			onError: (data) => {
				console.error(data);
				setDefaultSearch(false);
			},
			enabled: !!defaultSearch,
			staleTime: Infinity,
		},
	);
	const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
					const latitude = pos.coords.latitude;
					const longitude = pos.coords.longitude;
					setCurrentPosition({x: longitude, y: latitude});
					setDefaultSearch(true);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('GPS를 허용해주세요');
    }
  };

	useEffect(()=>{
		getLocationButtonRef.current.click();
		const fullHeight = window.innerHeight;
		const filterHeight = filterAreaRef.current.clientHeight;
		setMapHeight(fullHeight - filterHeight - 74);
		console.log(fullHeight, filterHeight, fullHeight - filterHeight)
	},[])

	useEffect(()=>{
		queryClient.invalidateQueries('sitter_default');
		if(sittersFilteredIsFetched){
			const sittersData = sittersFilteredSearch.data.sitter2 ? sittersFilteredSearch.data.sitter2 : sittersFilteredSearch.data.sitters;
			setSitters(sittersData);
			return;
		}
		if(sittersIsFetched){
			setSitters(sittersBeforeSearch?.data.sitters);
			return;
		}
	}, [sittersFilteredIsFetched, sittersIsFetched])

	useEffect(()=>{
		if(sitters?.length > 0){
			if(addressInfo &&  dates?.length > 0){
				// 검색 후 categorizing
				console.log('검색 후 categorizing')
				setSearched(true);
			}else{
				// 검색 전 categorizing
				console.log('검색 전 categorizing')
				refetchSitters(category);			
			}
		}
	},[category])

	useEffect(()=>{
		if(sitters?.length > 0 && !sittersIsRefetching){
			// 가격에 쉼표 추가
			for(let i=0; i<sitters.length; i++){
				const priceString = String(sitters[i].servicePrice);
				sitters[i].servicePrice = priceString.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			}
			// 카카오맵에 전달할 위도,경도 정보 저장
			setLocationItems(()=>{
				const positionItems = [];
				sitters.map(v=>{
					const obj = {x: v.location.coordinates[0], y: v.location.coordinates[1], sitterName: v.sitterName ? v.sitterName : '돌보미', averageStar: v.averageStar};
					positionItems.push(obj);
				})
				return positionItems;
			})
		}
	},[sitters])

	// useEffect(() => {
	// 	if(localStorage.getItem('accessToken')){
	// 		checkUser();
	// 	}else{
	// 		console.log('액세스 토큰 없음')
	// 	}
	// }, []);

	if (sittersFilteredIsLoading) return null;
	return (
		<div className="home" style={{position: 'relative'}}>
			<button type="button" onClick={getLocation} ref={getLocationButtonRef} style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0}}></button>
			<IndexPage>
				<FilterArea ref={filterAreaRef}>
					<div style={{position: 'relative', zIndex: 2}}>
						<input type="text" placeholder="날짜를 검색해주세요." value={dates?.length > 0 ? dates : ''} onClick={()=>setDatepickerDisplay(true)} style={{display: 'block', width: '100%', height: '46px', lineHeight: '46px', border: '1px solid #999', margin: '10px 0 0', padding: '0 15px'}} readOnly/>
						<DatepickerWrap style={{display: datepickerDisplay === true ? 'block' : 'none', position: 'absolute', left: '0', right: '0', top: '100%'}}>
							<Calendar
								ref={datepickerRef}
								onChange={setDate}
								multiple={true}
								format="YYYY/MM/DD"
								minDate={new Date()}
								maxDate={new Date(today.year + 1, today.month.number, today.day)}
								shadow={false}
								style={{
									borderRadius: 0,
								}}
							/>
							<StyledButton _title="닫기" _margin="0" _onClick={()=>{setDatepickerDisplay(false); setDatesFormat()}}/>
						</DatepickerWrap>
					</div>
					<div style={{position: 'relative'}}>
					<input type="text" placeholder="지역를 검색해주세요." value={addressInfo?.address_name && addressInfo?.address_name} onClick={()=>setIframeDisplay(true)} style={{display: 'block', width: '100%', height: '46px', lineHeight: '46px', border: '1px solid #999', margin: '10px 0 0', padding: '0 15px'}} readOnly/>
					{
						iframeDisplay && (
							<AddressWrap>
								<SearchAddress setAddressInfo={setAddressInfo} iframeDisplay={iframeDisplay} setIframeDisplay={setIframeDisplay}/>
								<StyledButton _title="닫기" _margin="0" _onClick={()=>setIframeDisplay(false)}/>
							</AddressWrap>
						)
					}
					</div>
					<StyledButton _onClick={()=>{
						if(addressInfo &&  dates?.length > 0){
							setSearched(true);
						}else{
							window.alert('날짜와 장소를 선택해주세요.')
						}
					}} _title="검색하기"/>
					{/* <button type="button" style={{border: '1px solid #333', fontSize: '16px', height: '40px', lineHeight: '42px', padding: '0 20px'}} onClick={()=>{
						if(addressInfo &&  dates?.length > 0){
							setSearched(true);
						}else{
							window.alert('날짜와 장소를 선택해주세요.')
						}
					}}>검색하기</button> */}
					<Categories>
						<ul>
						{categories.map((v, i) => {
							return (
								<li key={i}>
									<label>
										<input type="checkbox" onChange={(e) => {
											console.log('??')
											if(e.target.checked){ 
												console.log('??')
												setCategory((prev)=>{
													const new_category = [...prev];
													return new_category.filter(item=>{
														return Object.values(item)[0] !== Object.values(v)[0]
													})
												})
											}else{
												setCategory((prev)=>{
													const new_category = [...prev];
													new_category.push(v);
													return new_category;
												})
											}
										}}/>
										<span>{Object.values(v)}</span>
									</label>
								</li>
							);
						})}
						</ul>
					</Categories>
				</FilterArea>
				<SittersListArea>
					{
						sitters?.length > 0 ? (
							<>
							{
								(viewType === 'list')
								? (
								<ul>
									{
										sitters?.map((v,i)=>{
											return (
												<li key={`sitter_${i}`}>
													<Link to={`/detail/${v.sitterId}`}>
													<div className="image_area" style={{backgroundImage: `url(${v.mainImageUrl})`}}>
														<span className="sitter_image" style={{backgroundImage: `url(${v.imageUrl})`}}></span>
													</div>
													<div className="info_area">
														<p className="sitter">
															<em>{v.sitterName}</em>
															<span>재고용률 {v.rehireRate}%</span>
														</p>
														<p className="address">{v.address}</p>
														<div className="bottom_info">
															<div className="star">
																<img src={icon_star} alt="star"/>
																<span>{v.averageStar} </span>
																<span>{`(${v.reviewCount})`}</span>
															</div>
															<p className="price"><strong>{v.servicePrice}</strong><span>원~</span></p>
														</div>
													</div>
													</Link>
												</li>
											)
										})
									}
								</ul>
								) : (
									<MapContainer items={locationItems} _height={mapHeight}/>
								)
							}
							</>
						) : (
							<>
								{
									(!sittersIsFetched || !sittersFilteredIsFetched) ? <p>돌보미 리스트를 검색중입니다.</p> : <p>검색된 돌보미가 없습니다.</p>
								}
							</>
						)
					}
					
				</SittersListArea>
				<Buttons>
					{
						sitters?.length > 0 && (
							viewType === 'list' ? (
								<button type="button" className="showMapView" onClick={()=>setViewType('map')}><i style={{backgroundImage: `url(${icon_map})`}}></i>지도</button>
							) : (
								<button type="button" className="showListView" onClick={()=>setViewType('list')}><i style={{backgroundImage: `url(${icon_map})`}}></i>리스트</button>
							)
						)
					}
				</Buttons>
			</IndexPage>
		</div>
	);
}

const IndexPage = styled.div`
.rmdp-container{
	max-width: 100%;
	width: 100%;
	.rmdp-input{
		display: block;
		width: 100%;
		height: 46px;
		line-height: 46px;
		border-radius: 0;
		border: 1px solid #999;
		&:focus{
			box-shadow: none;
		}
	}
}
`
const DatepickerWrap = styled.div`
`
const Buttons = styled.div`
	position: fixed;
	width: 100%;
	bottom: 44px;
	text-align: center;
	pointer-events: none;
	left: 0;
	right: 0;
	z-index: 2;
	@media (min-width: 768px){
		max-width: 412px;
		right: 10%;
		left: auto;
	}
	button{
		position: absolute;
		bottom: 30px;
		left: 50%;
		bottom: 30px;
		transform: translateX(-50%);
		pointer-events: all;
		display: inline-block;
		line-height: 40px;
		height: 40px;
		padding: 0 16px;
		font-size: 16px;
		color: #FC9215;
		background: #FFFFFF;
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
		i{
			display: inline-block;
			width: 16px;
			height: 16px;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			vertical-align: middle;
			margin: -2px 5px 0 0;
		}
}
`
const FilterArea = styled.div`
.rmdp-container {
	position: relative;
}
 .rmdp-ep-arrow{
	height: 0!important;
	 & + div{
		width: 100%;
		top: 46px!important;
		transform: translate(0,0)!important;
		z-index: 100;
	 }
 }
 .rmdp-ep-arrow[direction=top]:after{
	display: none;
 }
 .rmdp-border{
	border-radius: 0;
 }

`
const Categories = styled.div`
	overflow: hidden;
	overflow-x: auto;
	margin: 0 -20px;
	padding: 16px 20px 24px;
	&{-ms-overflow-style:none; }
	&::-webkit-scrollbar { display:none; }
	ul{
		display: inline-flex;
		white-space: nowrap;
		gap: 10px;
	}
	label{
		position: relative;
		input{
			position: absolute;
			left: 0;
			top: 0;
			width: 0;
			height: 0;
			& + span{
				display: inline-block;
				padding: 0 12px;
				font-size: 14px;
				color: #787878;
				height: 32px;
				line-height: 32px;
				border-radius: 16px;
				box-sizing: border-box;
				border: 1px solid rgba(120, 120, 120, 0.2);
			}
			&:checked + span{
				color: #FC9215;
				font-weight: 700;
				border: 1px solid transparent;
				background: rgba(252, 146, 21, 0.1);
			}
		}
	}
`
const SittersListArea = styled.div`
	li{
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
		&+li{
			margin-top: 16px;
		}
		.image_area{
			position: relative;
			height: 0;
			padding-bottom: 29.2397%;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			.sitter_image{
				position: absolute;
				right: 23px;
				bottom: -23px;
				width: 60px;
				height: 60px;
				border-radius: 10px;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
		.info_area{
			padding: 14px 18px;
			color: #1A1A1A;
			.sitter{
				display: flex;
				align-items: center;
				gap: 10px;
				em{
					font-size: 18px;
					line-height: 1;
				}
				span{
					display: inline-block;
					background: rgba(252, 146, 21, 0.1);
					border-radius: 3px;
					padding: 0 5px;
					line-height: 18px;
					height: 16px;
					font-size: 12px;
					font-weight: 500;
					color: #FC9215;
					margin-top: -3px;
				}
			}
			.address{
				font-size: 12px;
				color: #787878;
				margin-top: 6px;
			}
			.bottom_info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10px;
				.star{
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					img{
						display: inline-block;
						width: 13px;
						margin-top: -1px;
						margin-right: 4px;
					}
					span{
						font-weight: 500;
						& + span{
							font-weight: 400;
							margin-left: 2px;
						}
					}
				}
				.price{
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #787878;
					gap: 2px;
					strong{
						color: #1A1A1A;
						font-size: 24px;
						font-weight: 700;
					}
					span{
						margin-top: 2px;
					}
				}
			}
		}
	}
`
const AddressWrap = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	border: 1px solid #999;
	margin-bottom: 10px;
	z-index: 100;
	& > div{
		/* margin-top: -32px; */
	}
	
`
export default Home;
