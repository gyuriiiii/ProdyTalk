import React, { useState } from 'react';
import {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import GroupChatComponent from '../components/chat/GroupChatComponent';
import FileComponent from '../components/room/FileComponent'
import InfoComponent from '../components/room/InfoComponent'
import VideoModal from '../components/video/VideoModal'
import Calendar from './Calendar';
import {Button} from '@material-ui/core';
import './css/RoomEnter.css';
function RoomEnter() {

    const location=useLocation()
    const id=location.state
    const [chat,setChat]=useState(false)
    const [calendar,setCalendar]=useState(false)
    const [file,setFile]=useState(false)
    const [link,setLink]=useState(false)
    const [info,setInfo]=useState(false)
    const [video,setVideo]=useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonText,setButtonText]=useState("코드 보기")
    const inviteLink = "/api/enterRoom?roomId="+id

    const onChat = () => {
        if(chat===false){
            setChat(true)
            setCalendar(false)
            setFile(false)
            setInfo(false)
            setVideo(false)
        }else {
            setChat(false);
        }
    }

    const onCalendar = () => {
        if(calendar===false){
            setCalendar(true)
            setChat(false)
            setFile(false)
            setInfo(false)
            setVideo(false)
        }else{
         setCalendar(false)
        }
    }

    const onFile = () => {
        if(file===false){
            setFile(true)
            setCalendar(false)
            setChat(false)
            setInfo(false)
            setVideo(false)
        }else{
            setFile(false)
        }
    }

    const onInfo = () => {
        if(info==false){
            setInfo(true)
            setFile(false)
            setCalendar(false)
            setChat(false)
            setVideo(false)
        }else{
            setInfo(false)
        }
    }

    const onCopy = () => {
        if(buttonText==="코드 보기"){
            setLink(true)
            setButtonText("코드 복사")
        }
        else if(buttonText==="코드 복사"){
            navigator.clipboard.writeText(inviteLink)
            window.alert("코드가 복사되었습니다!")
        }
    }

    const onVideo = () => {
        if(video==false){
            setVideo(true)
            setInfo(false)
            setFile(false)
            setCalendar(false)
            setChat(false)
        }else{
            setVideo(false)
        }
    }


    const openModal = () => {
        setModalOpen(true); // modal open
    };

    const closeModal = () => {
        setModalOpen(false); // modal close
    };
    console.log(`${id}번 방입니다!`)

    return(
        <div>
            <div id="inviteLink">
                {link && inviteLink}
                <Button variant="contained" color="primary" onClick={onCopy}>{buttonText}</Button>
            </div>
            <div id="menu">
                <Button variant="contained" color="primary" onClick={onInfo}>프로젝트 정보</Button>
                <Button variant="contained" color="primary" onClick={onCalendar}>팀별 캘린더</Button>
                <Button variant="contained" color="primary" onClick={onFile}>파일공유</Button>
                <Button variant="contained" color="primary" onClick={onVideo}>화상채팅</Button>
                <Button variant="contained" color="primary" onClick={onChat}>그룹채팅</Button>
                {file && <FileComponent roomId={id} />}
                {chat && <GroupChatComponent id={id}/>}
                {info && <InfoComponent roomId={id} />}
                <div className="calendar">
                    {calendar && <Calendar roomId={id}/>}
                </div>
                <div className="videomodal">
                    {video && <VideoModal open={modalOpen} close={closeModal} header={id}/>}
                </div>

            </div>
        </div>
    )
}

export default RoomEnter