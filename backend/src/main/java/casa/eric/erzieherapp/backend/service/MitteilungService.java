package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.repository.MitteilungRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MitteilungService {

    private final MitteilungRepository mitteilungRepository;

    public List<Mitteilung> getAllMitteilungen() {
        return mitteilungRepository.findAll();
    }
}
