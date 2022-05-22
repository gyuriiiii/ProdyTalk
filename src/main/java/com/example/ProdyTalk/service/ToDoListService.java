package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.ToDoListVO;

import java.util.List;

public interface ToDoListService {

    List<ToDoListVO> getToDoListById(int room_id);
    void setChecked(ToDoListVO todoListVO);
    void addToDoList(ToDoListVO todoListVO);
}
