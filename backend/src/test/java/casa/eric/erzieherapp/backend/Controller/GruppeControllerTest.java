package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class GruppeControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    GruppeRepository gruppeRepository;

    @Test
    void getAllGruppen() throws Exception {
        gruppeRepository.save(new Gruppe("ID1", "Gruppe1"));
        mockMvc.perform(get("/api/gruppe")).andExpect(status().isOk())
                .andExpect(content().json("""
                    [{"id": "ID1", "name": "Gruppe1"}]
                """));
    }

    @Test
    @WithMockUser
    void createGruppe() throws Exception {
        mockMvc.perform(post("/api/gruppe")
                .contentType("application/json")
                .content("""
                    {"name": "Gruppe1"}
                """)).andExpect(status().isOk())
                .andExpect(content().json("""
                    {"name": "Gruppe1"}
                """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}