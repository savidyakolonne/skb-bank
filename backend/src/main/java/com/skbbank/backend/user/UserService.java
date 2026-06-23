package com.skbbank.backend.user;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUserById(Long id){

        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }

        return user.get();

    }

//    can write like this as well ----------------------

//    public User getUserById(Long id){
//        return userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }

}
