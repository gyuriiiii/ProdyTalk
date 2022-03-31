package com.example.ProdyTalk.chat.controller;

import com.example.ProdyTalk.chat.vo.MessageVO;
import com.example.ProdyTalk.mapper.ChatMapper;
import com.example.ProdyTalk.service.ChatService;
import com.example.ProdyTalk.vo.UserVO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class GreetingController {

    private final ChatService chatService;
    private static Set<String> userList = new HashSet<>();

    @Autowired
    ChatMapper chatMapper;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/api/chatting")
    public Claims autheddn(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());

        return Jwts.parser()
                .setSigningKey("secret") // (3)
                .parseClaimsJws(token) // (4)
                .getBody();
    }


    @MessageMapping("/chat/{conversationId}")
    public void sendMessage(MessageVO messageVO, @DestinationVariable String conversationId){

        int messageId=chatService.searchLast();
        messageVO.setMessage_id(messageId+1);
        chatService.insertMessage(messageVO);

        System.out.println("메시지 내용 저장 성공");

        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/"+conversationId,messageVO);
    }


}