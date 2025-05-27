package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MitteilungControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    MitteilungRepository mitteilungRepository;

    @Test
    @WithMockUser
    void getAllMitteilungen_ShouldReturnListOfMitteilungen() throws Exception {
        mitteilungRepository.save(new Mitteilung("1","Titel1", "Content1"));
        mockMvc.perform(get("/api/mitteilung")).andExpect(status().isOk())
                .andExpect(content().json("""
                    [{"id": "1","title": "Titel1", "content": "Content1"}]
                """));
    }

    @Test
    @WithMockUser
    void createMitteilung_ShouldCreateMitteilung() throws Exception {
        mockMvc.perform(post("/api/mitteilung")
                .contentType("application/json")
                .content("""
                    {"title": "TitelCreate", "content": "ContentCreate"}
                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {"title": "TitelCreate", "content": "ContentCreate"}
                """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @WithMockUser
    void deleteMitteilung_ShouldReturnOk() throws Exception {
        mitteilungRepository.save(new Mitteilung("DELETE","TitelDELETE", "ContentDELETE"));
        mockMvc.perform(delete("/api/mitteilung/DELETE")).andExpect(status().isOk());
    }
}