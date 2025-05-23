package casa.eric.erzieherapp.backend.model;

import lombok.Builder;

@Builder
public record AppUserDTO(
        String id,
        String username
) {}
