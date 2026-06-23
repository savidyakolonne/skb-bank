package com.skbbank.backend.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "uesrs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
}
