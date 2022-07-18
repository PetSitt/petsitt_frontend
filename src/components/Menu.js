import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Router, Link } from "react-router-dom";

const Menu = () => {
	return (
		<MenuInner>
			<div className='item'><a href='/home'><i className='ic-home'></i></a> </div>
			<div className='item'><a href='/#0'><i className='ic-contact'></i></a></div>
			<div className='item'><a href='/reservation/list'><i className='ic-book'></i></a></div>
			<div className='item'><a href='/mypage'><i className='ic-user'></i></a></div>
		</MenuInner>
	);
};

const MenuInner = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 54px;
	line-height: 54px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-top: 1px solid rgba(120,120,120,0.2);
	margin-top: 100px;
	background-color: #fff;
	@media (min-width: 768px){
		max-width: 412px;
		right: 10%;
		left: auto;
	}
	.item {
		font-size: 22px;
	}
`
export default Menu;