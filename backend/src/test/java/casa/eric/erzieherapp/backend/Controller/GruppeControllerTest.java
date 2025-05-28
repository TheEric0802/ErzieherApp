package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
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