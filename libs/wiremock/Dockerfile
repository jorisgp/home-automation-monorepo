FROM wiremock/wiremock:3.3.1
COPY ./libs/wiremock/src/lib/__files /home/wiremock/__files
COPY ./libs/wiremock/src/lib/mappings /home/wiremock/mappings
CMD ["--enable-stub-cors"]
