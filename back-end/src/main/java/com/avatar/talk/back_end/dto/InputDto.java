package com.avatar.talk.back_end.dto;

public class InputDto {
    private String text;

    // Construtor vazio (necessário para deserialização JSON)
    public InputDto() {}

    // Construtor com parâmetro
    public InputDto(String text) {
        this.text = text;
    }

    // Getter e Setter
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
