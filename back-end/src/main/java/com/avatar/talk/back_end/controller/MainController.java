package com.avatar.talk.back_end.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avatar.talk.back_end.dto.InputDto;
import com.avatar.talk.back_end.dto.ResponseDTO;

@RestController
@RequestMapping("/api/chat")
public class MainController {

    // Endpoint POST: /api/chat/message
    @PostMapping("/message")
    public ResponseDTO sendMessage(@RequestBody InputDto input) {
        String userMessage = input.getText();

        // Aqui você pode chamar o modelo NLP Python depois
        // Por enquanto, vamos apenas retornar o texto de forma simples
        String responseMessage = "Você disse: " + userMessage;

        return new ResponseDTO(responseMessage);
    }
}
