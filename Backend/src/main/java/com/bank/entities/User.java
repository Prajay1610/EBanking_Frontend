package com.bank.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends BaseEntity{
	
//	@Pattern(regexp = "((?=.\\d)(?=.[a-z])(?=.[#@$]).{5,20})", message = "Invalid Password format!!!!")
    @Column(length = 250,nullable = false)
    private String password;

    @NotBlank(message = "Email must be not null and not blank!!!!")
	@Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String fname;

    @Column(nullable = false)
    private String lname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false,name="is_active")
    private Boolean isActive=true;
    
    @Column(nullable = false, name = "Gender")
    private Gender gender;
    
    @Column(nullable = false,name = "phone_no")
    private String phoneNo;

    @Column(nullable = false,name = "address")
    private String address;
    
    @Column(name = "profile_image", columnDefinition = "LONGBLOB")
    private byte[] profileImage;
   
}