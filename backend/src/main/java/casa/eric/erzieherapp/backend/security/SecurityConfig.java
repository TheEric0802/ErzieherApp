package casa.eric.erzieherapp.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/mitteilung").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/mitteilung/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/gruppe").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/gruppe/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/kind").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/kind/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/gruppentagebuch").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/gruppentagebuch/*").permitAll()
                        .requestMatchers("/api/mitteilung").authenticated()
                        .requestMatchers("/api/mitteilung/*").authenticated()
                        .requestMatchers("/api/gruppe").authenticated()
                        .requestMatchers("/api/gruppe/*").authenticated()
                        .requestMatchers("/api/kind").authenticated()
                        .requestMatchers("/api/kind/*").authenticated()
                        .requestMatchers("/api/gruppentagebuch").authenticated()
                        .requestMatchers("/api/gruppentagebuch/*").authenticated()
                        .anyRequest().permitAll())
                .logout(logout -> logout.logoutSuccessUrl(appUrl))
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl(appUrl));

        return http.build();
    }
}
