package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;

import java.util.List;

public interface RoomService {

    //전체 방 데이터
    public void insertRoom(RoomListVO room);

    public int findIdRoom(RoomListVO room);

    //유저 속해있는 방 데이터
    public void joinRoom(RoomJoinVO room);

    public List<RoomListVO> getAllRooms();

    public List<RoomJoinVO> findInRoom(String user_id);
    //유저가 속해있는 방 리스트 불러오기
    public RoomListVO getInRooms(int room_id);




}
