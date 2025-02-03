package com.bank.dtos;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public class UserImageDto {

    @NotNull(message = "User ID must not be null!")
    private Integer userId;

    @NotNull(message = "Profile image must not be null!")
    private MultipartFile profileImage;

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public MultipartFile getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(MultipartFile profileImage) {
        this.profileImage = profileImage;
    }
}