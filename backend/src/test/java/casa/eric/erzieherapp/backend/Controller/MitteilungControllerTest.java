package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest @AutoConfigureMockMvc
class MitteilungControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    MitteilungRepository mitteilungRepository;

    @Test
    void getAllMitteilungen_ShouldReturnListOfMitteilungen() throws Exception {
        mitteilungRepository.save(new Mitteilung("1","Titel1", "Content1"));
        mockMvc.perform(get("/api/mitteilung")).andExpect(status().isOk())
                .andExpect(content().json("""
                    [{"id": "1","title": "Titel1", "content": "Content1"}]
                """));
    }
}