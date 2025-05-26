package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.AppUserDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping
    public AppUserDTO getMe(@AuthenticationPrincipal OAuth2User user) {
        return AppUserDTO.builder()
                .id(user.getName())
                .username(user.getAttributes().get("preferred_username").toString())
                .build();
    }
}
